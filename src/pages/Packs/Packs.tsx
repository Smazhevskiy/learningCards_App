import React, {FC, memo, useEffect, useRef} from 'react'
import {useDispatch} from 'react-redux'
import {fetchCardPacks} from '../../store/reducers/packs-reducer'
import {useTypedSelector} from '../../hooks/hooks'
import {Redirect} from 'react-router-dom'
import {PATH} from '../../routes/routes'
import {PacksPagination} from './PacksPagination/PacksPagination'
import {PrivatePacksToggle} from './PrivatePacksToggle/PrivatePacksToggle'
import {PacksSearch} from './PacksSearch/PacksSearch'
import {CardsCountRange} from './CardsCountRange/CardsCountRange'
import {PacksTable} from './PacksTable/PacksTable'

export const Packs: FC =  memo( () => {
    const dispatch = useDispatch()
    const isLoggedIn = useTypedSelector(state => state.auth.isLoggedIn)
    const {
        page,
        pageCount,
        cardPacksTotalCount,
        minCardsCount,
        maxCardsCount,
        cardPacks,
        privatePacks,
        currentCardsCount,
        countPerPage,
        sortPacksMethod
    } = useTypedSelector(state => state.packs)

    const paginationScrollTopRef = useRef<HTMLHeadingElement>(null)

    useEffect(() => {
        dispatch(fetchCardPacks())
    }, [page, pageCount, currentCardsCount, privatePacks, sortPacksMethod, dispatch])



    useEffect(() => {
        paginationScrollTopRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [page, pageCount])

    if (!isLoggedIn) return <Redirect to={PATH.LOGIN}/>

    return (
        <div>
            <h1 ref={paginationScrollTopRef}>Packs</h1>

            <PacksSearch/>
            <CardsCountRange minCardsCount={minCardsCount} maxCardsCount={maxCardsCount} currentCardsCount={currentCardsCount}/>
            <PrivatePacksToggle privatePacks={privatePacks}/>

            <PacksTable cardPacks={cardPacks}/>

            <PacksPagination totalCount={cardPacksTotalCount}
                             pageCount={pageCount}
                             currentPage={page}
                             countPerPage={countPerPage}/>
        </div>
    )
})