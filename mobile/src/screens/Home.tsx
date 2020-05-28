import React, { useState } from 'react'
import {Button, ScrollView, Text, View} from 'react-native'
import AuthGet from '../AuthGet'
import AsyncStorage from '@react-native-community/async-storage'
import styled from 'styled-components'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import InputWithIcon from "../components/InputWithIcon";
import Col from "../components/layout/Col";
import Row from "../components/layout/Row";
import BackgroundShape4 from "../assets/svg/background_shape_4.svg"
import TrainingList from "../components/lists/TrainingList";
import ListDivider from "../components/lists/ListDivider";
import { format } from "date-fns";
import Toggle from '../components/Toggle';

const ToggleText = styled(Text)<{ active: boolean }>`
  color: ${props => props.active ? 'white' : 'grey'};
`

const CacheButton = styled(Button)`
  align-self:flex-start;
`;

const Home = () => {
    const [expandedList, setExpandedList] = useState("");

    const ToggleData = (obj: { currentIndex: any }) => {
        // on ComponentDidMount the currentIndex got a default number from state
        // when clicked the object changes and gets a nested index inside currentIndex
        const firstIndexActiveOnLoad = (typeof obj.currentIndex === 'number') ? obj.currentIndex : obj.currentIndex.index;

        return [
            (myIndex: number) =>
                <ToggleText
                    active={myIndex === firstIndexActiveOnLoad}
                    onPress={() => {setExpandedList("simple")}}>
                    <MaterialCommunityIcons
                        name={"view-sequential"} size={30}/></ToggleText>,
            (myIndex: number) => <ToggleText
                onPress={() => {setExpandedList("expanded")}}
                active={myIndex === obj.currentIndex.index}><MaterialCommunityIcons
                name={"view-stream"}
                size={30}/></ToggleText>
        ]
    };

    // @ts-ignore
    return (
        <View>
            <BackgroundShape4 style={{position: "absolute"}}/>
            <ScrollView style={{paddingTop: 60}}>
                <Row>
                    <Col size={1}/>
                    <Col size={10}>
                        <InputWithIcon icon={"search"} placeholder={"Search here..."}/>
                    </Col>
                    <Col size={1}/>
                </Row>

                <Row>
                    <Col size={1}/>
                    <Col size={5}>
                        <Toggle>
                            { ToggleData }
                        </Toggle>
                    </Col>

                    <Col size={5}>
                        {/*Should turn into Filter Component*/}
                        <Text>Filter Component</Text>
                    </Col>
                    <Col size={1}/>
                </Row>

                <View style={{marginTop: 100}}/>
                <TrainingList expandedList={expandedList}/>

                <View style={{margin: 30, flexDirection: "row"}}>
                    <CacheButton title={'clear the cache'}
                                 onPress={() => AsyncStorage.clear()}/>
                    <View>
                        <AuthGet/>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
};

export default Home
