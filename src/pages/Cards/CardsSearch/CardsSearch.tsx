import React, {ChangeEvent, FC, useState} from 'react'
import {Input} from '../../../components/UI/Input/Input'
import debounce from 'lodash.debounce'
import {fetchCards} from '../../../store/reducers/cards-reducer'
import {useDispatch} from 'react-redux'

export const CardsSearch: FC = () => {
    const dispatch = useDispatch()
    const [searchQuestionValue, setSearchQuestionValue] = useState('')
    const [searchAnswerValue, setSearchAnswerValue] = useState('')

    const onQuestionSearchChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuestionValue(e.currentTarget.value)
        debouncedQuestionSearch(e.currentTarget.value)
    }

    const onAnswerSearchChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchAnswerValue(e.currentTarget.value)
        debouncedAnswerSearch(e.currentTarget.value)
    }

    const debouncedQuestionSearch = debounce(value => dispatch(fetchCards({cardQuestion: value})), 500)//Todo useCallback?
    const debouncedAnswerSearch = debounce(value => dispatch(fetchCards({cardAnswer: value})), 500) //Todo useCallback?
    return (
        <>
            <label htmlFor="cards-question-search">
                Question Search
                <Input id={'cards-question-search'}
                       placeholder={'Enter question...'}
                       value={searchQuestionValue}
                       onChange={onQuestionSearchChangeHandler}/>
            </label>

            <label htmlFor="cards-answer-search">
                Answer Search
                <Input id={'cards-answer-search'}
                       placeholder={'Enter answer...'}
                       value={searchAnswerValue}
                       onChange={onAnswerSearchChangeHandler}/>
            </label>
        </>
    )
}