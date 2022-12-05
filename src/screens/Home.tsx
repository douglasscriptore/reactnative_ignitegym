import { ExerciseCard } from '@components/ExerciseCard'
import { Group } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'
import { useNavigation } from '@react-navigation/native'
import { AppNavigationRoutesProps } from '@routes/app.routes'
import { HStack, VStack, FlatList, Heading, Text } from 'native-base'
import { useState } from 'react'

export function Home(){
  const [groups, setGroups] = useState(['costas', 'ombro', 'biceps', "triceps"])
  const [exercises, setExercises] = useState(['Puxada frontal', 'Remanda curvada', 'Remada lateral'])
  const [groupSelected, setGroupSelected] = useState("costas");

  const navigation = useNavigation<AppNavigationRoutesProps>()


  function handleOpenExerciseDetails() {
    navigation.navigate('exercise');
  } 

  return (
    <VStack flex={1} >
        <HomeHeader />
          <FlatList 
            data={groups}
            keyExtractor={item => item}
            renderItem={({item}) => (
              <Group
                name={item}
                isActive={groupSelected.toUpperCase() === item.toUpperCase()}
                onPress={() => setGroupSelected(item)}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            my={10}
            _contentContainerStyle={{px: 8}}
            maxHeight={10}
            minHeight={10}
          />

          <VStack flex={1} px={8}>
            <HStack justifyContent="space-between" mb={5}>
              <Heading color="gray.200" fontSize="md">
                Exercícios
              </Heading>
              <Text color="gray.200" fontSize="sm">
                {exercises.length}
              </Text>
            </HStack>

            <FlatList
              data={exercises}
              keyExtractor={item => item}
              renderItem={({item}) => (
                <ExerciseCard name={item} onPress={handleOpenExerciseDetails}/>
              )}
              showsVerticalScrollIndicator={false}
              _contentContainerStyle={{ paddingBottom: 20}}
            />
          </VStack>


    </VStack>
  )
}