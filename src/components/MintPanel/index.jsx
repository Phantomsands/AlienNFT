import './MintPanel.css'
import {useState, useEffect} from 'react'
import {ethers} from 'ethers'

export default function MintPanel({eventHandler, mintHandler, image, mintString}) {

	useEffect(() => {
		console.log("Mint Render");
	}, []);

	return (
		<div>
			<div>{mintString}</div>
			<div className="form-class">
			<form onSubmit={eventHandler}>
			<label> TokenID
				<input type="number" name="avatarID"/>
			</label>
				<button type="submit">
					VIEW
				</button>
			</form>
			</div>
			<div className="image_class">
				<img src={image}/>
			</div>
			<div className="mint-button">
				<button type ="button" onClick={mintHandler}>
					MINT
				</button>
			</div>
		</div>
	);
	
};
