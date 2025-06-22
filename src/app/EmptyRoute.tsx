import Loading from '@/components/Loading';
import TitleSubtitle from '@/components/TitleSubtitle';
import Waiter from '@/components/Waiter';
import React from 'react';

function EmptyRoute({waiting}:{waiting?:string}) {
    return <Waiter delay={2.5}>
        <Loading object={waiting} wholePage={true}/>
        <TitleSubtitle title={"Страница не существует"} subtitle={"Похоже, такой страницы не существует..."}/>
    </Waiter>
}

export default EmptyRoute;