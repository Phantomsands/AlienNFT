import './ConnectButton.css';
import {useEffect, useState} from 'react';
import {ethers} from 'ethers';
import DuelAbi from './../../utils/DeathDuels.json';

export default function ConnectButton({handleEvent}) {

	return (
		<div className="panel-class">
			<div className="title-class">
				ON CHAIN ALIEN
			</div>
			<div className="info-class">
				<p>
				This is a collection of 10 000 ERC721 compliant
NFTs. These potrait images are generated in svg format with pseudo random colors. The mint price is fixed at 166 MATIC which is approximately a $100 at the time of creation. Inspired by the On Chain Monkey the Alien has also been 
deployed in a single contract and has no other dependancies besides this site for minting.
Thank You for your support. S.S.M.
				</p>
			</div>
			<div>
				<button onClick={handleEvent}>
				CONNECT
				</button>
			</div>
			<div>
				Twitter: @001Node
			</div>
		</div>
	);
}
