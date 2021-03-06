// import React from "react";
// import { Searchbar } from "react-native-paper";
// import { StatusBar, FlatList, SafeAreaView } from "react-native";

// // import styled from "styled-components/native";
// import styled from "styled-components";

// import {Spacer } from '../../../components/spacer/spacer.component'
// import { RestaurantInfoCard } from "../components/restaurant-info-card.component";

// const SafeArea = styled(SafeAreaView)`
//   flex: 1;
//   ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
// `;

// const SearchContainer = styled.View`
//   padding: ${(props) => props.theme.space[3]}
// `;

// const RestaurantListContainer = styled.View`
//   flex: 1;
//   padding: ${(props) => props.theme.space[3]};
// `;

// export const RestaurantsScreen = () => (
//   <SafeArea>
//     <SearchContainer>
//       <Searchbar />
//     </SearchContainer>
//     <FlatList
//       data={[
//         { name: 1 },
//         { name: 2 },
//         { name: 3 },
//         { name: 4 },
//         { name: 5 },
//         { name: 6 },
//         { name: 7 },
//         { name: 8 },
//         { name: 9 },
//         { name: 10 },
//         { name: 11 },
//         { name: 12 },
//         { name: 13 },
//         { name: 14 },
//       ]}
//       renderItem={() => (
//         <Spacer position="bottom" size="large">
//           <RestaurantInfoCard />
//         </Spacer>
//       )}
//       keyExtractor={(item) => item.name}
//       contentContainerStyle={{ padding: 16 }} 
//     />
//   </SafeArea>
// );


import React, { useContext } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator, Colors } from "react-native-paper";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";

import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";

import { Search } from "../components/search.component";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

const Loading = styled(ActivityIndicator)`
  margin-left : -25px;
`;

const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const RestaurantsScreen = () => {

  const { isLoading, error, restaurants }  = useContext(RestaurantsContext);
  console.log(error);
  const restaurantContext = useContext(RestaurantsContext);
  console.log(restaurantContext)
  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size = {50} animating={true} color={Colors.blue300} />

        </LoadingContainer>
      )}
        <Searchbar />
      <RestaurantList
        data={restaurants}
        renderItem={({ item }) => (
          <Spacer position="bottom" size="large">
            <RestaurantInfoCard />
          </Spacer>
        )}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  );
};