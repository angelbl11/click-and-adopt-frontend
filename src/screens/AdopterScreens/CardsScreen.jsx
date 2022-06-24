import React, {
	useRef,
	useState,
	useCallback,
	useEffect,
	useContext,
} from "react";
import { StatusBar } from "expo-status-bar";
import CardComponent from "../../components/Card/CardComponent";
import { PageTitle, CardCont } from "../../components/Utils/Styles";
import FooterButtons from "../../components/Card/FooterButtons";
import { Animated, PanResponder } from "react-native";
import { CARD, ACTION_OFFSET } from "../../components/Card/CardConstants";
import { View } from "native-base";
import { AuthContext } from "../../context/Auth";
//Graphql
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_RANDOM_PETS } from "../../graphql/queries";
import { GIVE_LIKE_PET } from "../../graphql/mutations";

const CardsScreen = ({ navigation }) => {
	const [petsCards, setPetsCards] = useState([]);
	const swipe = useRef(new Animated.ValueXY()).current;
	const tiltSign = useRef(new Animated.Value(1)).current;
	const { user } = useContext(AuthContext);
	const url = "https://calm-forest-47055.herokuapp.com/ProfilePictures/";
	const [giveLikeToPet] = useMutation(GIVE_LIKE_PET);
	const [getPets, { data, loading }] = useLazyQuery(GET_RANDOM_PETS, {
		variables: {
			userId: user.id,
		},
		onError: (err) => {
			console.log("Network error:");
		},

		onCompleted: (data) => {
			console.log("consulta completada------");
			setPetsCards(data?.getRandomPet);
			console.log(data?.getRandomPet);
		},
	});

	useEffect(() => {
		console.log("Bienvenido a la sección de las mascotas");
		getPets();
	}, []);

	const panResponder = PanResponder.create({
		onMoveShouldSetPanResponder: () => true,
		onPanResponderMove: (_, { dx, dy, y0 }) => {
			swipe.setValue({ x: dx, y: dy });
			tiltSign.setValue(y0 > CARD.HEIGHT / 2 ? 1 : -1);
		},
		onPanResponderRelease: (_, { dx, dy }) => {
			const direction = Math.sign(dx);
			const isActionActive = Math.abs(dx) > ACTION_OFFSET;

			if (isActionActive) {
				Animated.timing(swipe, {
					duration: 200,
					toValue: {
						x: direction * CARD.OUT_OF_SCREEN,
						y: dy,
					},
					useNativeDriver: true,
				}).start(removeTopCard);
				direction * CARD.OUT_OF_SCREEN == 621
					? giveLikeToPet() && console.log("CARTAS DE LIKE: ", petsCards)
					: console.log(direction * CARD.OUT_OF_SCREEN);
			} else {
				Animated.spring(swipe, {
					toValue: {
						x: 0,
						y: 0,
					},
					useNativeDriver: true,
					friction: 5,
				}).start();
			}
		},
	});

	const removeTopCard = useCallback(() => {
		setPetsCards((previousState) => previousState?.slice(1));
		swipe.setValue({ x: 0, y: 0 });
	}, [swipe]);

	const handleChoice = useCallback(
		(direction) => {
			Animated.timing(swipe.x, {
				toValue: direction * CARD.OUT_OF_SCREEN,
				duration: 400,
				useNativeDriver: true,
			}).start(removeTopCard);
			direction == 1
				? giveLikeToPet({
						variables: {
							petId: petsCards[0].id,
							userId: user.id,
						},
						onCompleted: (data) => {
							console.log("LIKE PARA QUE LO VEA pero en COMPLETED");
							console.log(data);
						},
						onError: (err) => {
							console.log("ERROR ", err.clientErrors);
						},
						update() {
							console.log("Like para que lo vea pero en update apa");
						},
				  }) && console.log("CARTAS DE LIKE: ", petsCards)
				: console.log("NO HAY LAIC");
		},
		[removeTopCard, swipe.x]
	);
	return (
		<View bgColor={"#FFFFFF"} flex={1}>
			<StatusBar style="dark" />
			<PageTitle>Encuentra Mascotas</PageTitle>
			{loading ? (
				<PageTitle>CARGANDO</PageTitle>
			) : (
				<CardCont>
					{petsCards
						?.map(
							(
								{
									adoptedPetName,
									petPicture,
									id,
									genderOfAdoptedPet,
									adoptedPetDescription,
									ageOfAdoptedPet,
									isHealthyWithOtherPets,
									isHealthyWithKids,
									typeOfAdoptedPet,
									coexistenceWithOtherPets,
									adoptedPetProtocol,
								},
								index
							) => {
								const isFirst = index === 0;
								const dragHandler = isFirst ? panResponder.panHandlers : {};
								console.log(
									"Id de la mascota: " + petsCards[index].adoptedPetName
								);
								return (
									<CardComponent
										key={index}
										name={adoptedPetName}
										source={url + petPicture?.filename}
										isFirst={isFirst}
										{...dragHandler}
										swipe={swipe}
										tiltSign={tiltSign}
										pressed={() =>
											navigation.navigate("PetProfile", {
												petId: id,
												name: adoptedPetName,
												gender: genderOfAdoptedPet,
												des: adoptedPetDescription,
												age: ageOfAdoptedPet,
												isHealthyP: isHealthyWithOtherPets,
												isHealthyK: isHealthyWithKids,
												typeOf: typeOfAdoptedPet,
												coexistence: coexistenceWithOtherPets,
												protocol: adoptedPetProtocol,
												petProfPic: url + petPicture?.filename,
												isVisible: false,
											})
										}
									/>
								);
							}
						)
						.reverse()}
				</CardCont>
			)}

			<FooterButtons handleChoice={handleChoice}></FooterButtons>
		</View>
	);
};

export default CardsScreen;
