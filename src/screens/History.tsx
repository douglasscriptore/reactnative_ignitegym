import { HistoryCard } from '@components/HistoryCard'
import { ScreenHeader } from '@components/ScreenHeader'
import { Center , Heading, Text, VStack,SectionList } from 'native-base'
import { useState } from 'react'


export function History(){
  const [exercises, setExercises] = useState([
    {
      title: '26.08.22',
      data: ["Puxada Frontal", "Remada unilateral"]
    },
    {
      title: '27.08.22',
      data: ["Remada unilateral"]
    }
  ])

  return (
    <VStack flex={1}>
        <ScreenHeader title="Histórico de Exercícios"/>

        <SectionList
          sections={exercises}
          keyExtractor={item => item}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <HistoryCard />}
          renderSectionHeader={({section}) => (
            <Heading color="gray.200" fontSize="md" mt={10} mb={3}>
              {section.title}
            </Heading>
          )}
          px={8}
          contentContainerStyle={exercises.length === 0 && {flex: 1, justifyContent: 'center'}}
          ListFooterComponent={() => (
            <Text color="gray.100" textAlign={"center"}> 
              Não há exercícios registrados ainda. {'\n'}
              Vamos fazer exercícios hoje?
            </Text>
          )}
        />
        
    </VStack>
  )
}