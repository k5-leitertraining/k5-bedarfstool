import { unparse } from 'papaparse'
import { useQuestions } from './questions.js'
import { useEvaluation } from './evaluation.js'
import { computed } from 'vue'

export const useDownload = () => {
  const { allQuestions } = useQuestions()
  const { score } = useEvaluation()

  const getDownloadData = () => {
    const answersHeader = ['Themenbereich', 'Frage', 'Deine Antwort']
    const answerRows = allQuestions.value
      .map((question) => {
        return question.answers
          .filter(({ value }) => value)
          .map((answer) => [
            question.title.trim(),
            question.question.trim(),
            answer.label.trim(),
          ])
      })
      .flat()

    const scoreRow = ['Dein Ergebnis', '', score.value.toFixed(2)]

    const emptyRow = ['', '', '']

    return [answersHeader, ...answerRows, emptyRow, scoreRow]
  }

  const download = (data: string, filename: string, type: string) => {
    const file = new Blob([data], { type })
    const a = document.createElement('a')
    const url = URL.createObjectURL(file)
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  const fileContent = computed(() => {
    const data = getDownloadData()
    return unparse(data)
  })

  const downloadResults = () => {
    download(fileContent.value, 'K5-Bedarfstool-Ergebnisse.csv', 'text/csv')
  }

  return { downloadResults, fileContent }
}
