import React, { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";



const Card = ({imgUrl, description, title, className, selected = false, ...props} : {imgUrl?: string, description?: string, title?: string, selected?: boolean} & ComponentProps<'div'>) => {
    return <div className={twMerge([selected ? 'border-4 border-violet-600 dark:border-white' : ''], className)} {...props}>
        {imgUrl ? <img width={'100%'} src={imgUrl}></img> : null}
        {title ? <title>{title}</title> : null}
        {description ? <p>{description}</p> : null}
    </div>
}

export default Card;