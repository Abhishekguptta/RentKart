import React from 'react'
import classNames from 'classnames';

import FallbackImg from '../images/img_placeholder.svg';
import '../styles/_card.scss'

const Card = ({ children, ...props }) => (
	<div className={classNames('card',{[`${props.cardClassName}`] : props.cardClassName})}>
	<img  
		className='card__picture' 
		src={props.roomPhoto || FallbackImg}  
		onError={(e) => (e.currentTarget.src = FallbackImg)} 
		alt={"img"}
	/>
	<div className='card__info'>
	<p className='card__info--desc'>{props.description}</p>
	<span className='card__info--rent'>Rent- {props.rentalPrice}/ -P.M</span>
	{children ? <>{children}</> : null}
	</div>
	</div>
);

export default Card;
