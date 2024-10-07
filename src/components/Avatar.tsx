import { cva, VariantProps } from "class-variance-authority";
import React, { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";


const styles = cva([], {
    variants: {
        variant: {
            default: ['rounded-md'],
            rounded: ['rounded-full']
        },
        size: {
            small: ['h-[30px] w-[30px]'],
            medium: ['h-[40px] w-[40px]'],
            large: ['h-[50px] w-[50px]']
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'medium'
    }
})

export type AvatarProps = VariantProps<typeof styles> & ComponentProps<'img'>

const Avatar = ({variant, size, className, ...props}: AvatarProps) => {
    return <img {...props} className={twMerge(styles({variant, size}), className)} />
}

export default Avatar;