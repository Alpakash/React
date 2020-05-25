import React from 'react';
import Row from "../layout/Row";
import Col from "../layout/Col";
import { H1, H3Bold, H6 } from "../typography/Typography";
import styled from "styled-components";
import { View } from "react-native";
import Distance from "../../assets/svg/distance_sign.svg";
import Pin from "../../assets/svg/location_pin.svg";
import ListDivider from "./ListDivider";
import { format } from 'date-fns';

const Container = styled(View)`
background-color: ${ ({ theme }) => theme.background.ghostWhite };
border-radius: 10px;
justify-content: space-between;
padding: 10px;
flex: 10;
margin: 5px 0;
flex-direction: row;
`;

const Price = styled(View)`
flex: 1;
padding-right: 20px;
align-items: flex-end;
justify-content: center;
`;

const trainings = [
    {
        date: new Date(2020, 4, 25, 23, 45),
        name: "Swimming",
        distance: 25.4,
        location: "Dolfinarium"
    }, {
        date: new Date(2020, 4, 25, 23, 50),
        name: "Kickboxing",
        distance: 23.2,
        location: "Colosseum"
    }, {
        date: new Date(2020, 4,25,23,50),
        name: "Boxing",
        distance: 5,
        location: "The Ring"
    }, {
        date: new Date(2020, 4, 25, 23, 55),
        name: "Yoga",
        distance: 1000,
        location: "Nirvana Station"
    },
    {
        date: new Date(2020, 4, 25, 24, 30),
        name: "Hallo",
        distance: 20,
        location: "Next"
    },
    {
        date: new Date(2020, 4, 25, 24, 20),
        name: "Yo",
        distance: 20,
        location: "Next"
    },
];

const sorted = trainings.slice().sort((a: any, b: any) => a.date - b.date);

const sortedTrainings: { [key: string]: any } = {
    thirty: [],
    sixty: []
};

// loop through training array, through object elements and scan date prop
// do while loop: if there are classes in the upcoming 30 minutes don't stop and put them in the 30 minute box
// if in the next thirty minutes there are classes, push the dates in the array Trainings.

// check for upcoming classes from this hour
// console.log(`${ trainings.map(x => JSON.stringify(x)) }`)

// console.log(dateNow)
// console.log(trainings[2].date)
// console.log(thirty);
// console.log(new Date(2020, 4, 25, 22, 41));
// console.log(new Date(Date.UTC(2020, 5, 25, 22, 33)));
// console.log(new Date().setUTCMinutes(30));

let i = 0;
let c = 1;
do {
    const count = new Date(Date.now() + (30 * c) * 60 * 1000);
    const dateNow = new Date();

    if (sorted[i].date > dateNow && sorted[i].date < count) {
        sortedTrainings.thirty.push(sorted[i]);
    }

    i++;
} while (i < sorted.length);

console.log(sortedTrainings);

const SimpleList = () => {
    return (
        <>
            <ListDivider>{ format(new Date().getTime(), "HH:mm") }</ListDivider>
            { sortedTrainings.thirty.map((x: any, idx: number) =>
                <Row key={ idx }>
                    <Col size={ 1 }/>
                    <Container style={ { elevation: 4 } }>
                        <View style={ { flex: 2 } }>
                            <Row>
                                <H6 style={ { marginTop: 5, marginRight: 10 } }>{ format(x.date, "HH:mm") }</H6>
                                <H3Bold>{ x.name } </H3Bold>
                            </Row>
                            <H6><Distance/> { x.distance } KM</H6>
                            <H6><Pin/> { x.location }</H6>
                        </View>
                        <Price>
                            <H1>€0,00</H1>
                        </Price>
                    </Container>

                    <Col size={ 1 }/>
                </Row>
            ) }
        </>
    );
};

export default SimpleList;
