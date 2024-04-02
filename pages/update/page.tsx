import { ReactNode } from "react";

type propsType = {
    params: {
        id: number,
        title: string,
        date: string,
    }
}

export default function Update(props: propsType) {




    return (
        <>
            <div>{props.params.id}</div>
        </>
    )
}