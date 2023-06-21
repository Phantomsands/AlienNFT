import { useState, useEffect } from 'react';
import {ethers} from 'ethers';
import './App.css';
import IconAbi from './utils/Icon.json';
import MintPanel from './components/MintPanel';
import ConnectButton from './components/ConnectButton';
import detectEthereumProvider from '@metamask/detect-provider';

function App() {
		
	const [provider, setProvider] = useState(null);
	const [account, setAccount] = useState(null);
	const [iconContract, setIconContract] = useState(null);
	const [avatarImg, setAvatarImg] = useState(null);
	const [check, setCheck] = useState(null);

	const iconContractAddress = "0xcf5a7A31BE8A3824d019fFF996b7B4EC0992A27A";

	const getNewImage = async function(MintAddress,ImgID) {
		try {
			const imageTxn = await iconContract.getIconURL(ImgID);
			setAvatarImg(imageTxn);
			const addressMinter = await account.getAddress();
			if (MintAddress === addressMinter) {
			const stringOpen = 'Congratulations on Minting OCALIEN #';
			const stringClose = ' Input tokenID below to view';
			const stringMint = stringOpen.concat(ImgID, stringClose);
			setCheck(stringMint);
			}
			console.log("Image Set",MintAddress," ",addressMinter);
		}
		catch (error) {
			console.error(error);
		}
		finally {
			console.log("New Info Method");
		}
	};

	const getAccount = async function() {
		try {
			const providerCheck = await detectEthereumProvider();
			if(providerCheck) {
				const accountsArray = await window.ethereum.request({method: 'eth_requestAccounts'});
				if (accountsArray.length === 0) {
					alert('Connect to Metamask');
					return;
				}
				const getChainID = await window.ethereum.request({method: 'eth_chainId'});
				console.log(getChainID);
				if (getChainID != 137) {
					alert('Switch to PolyGon and Connect');
					return;
				}
				setAccount(accountsArray[0]);
				console.log("Account Set",accountsArray[0]);
				const provider = new ethers.BrowserProvider(window.ethereum);
				const newSign = await provider.getSigner();
				setProvider(newSign);
				const iconContractNew = new ethers.Contract(iconContractAddress, IconAbi, newSign);
				setIconContract(iconContractNew);
				console.log("Icon Contract Set");
			}
			else {
				alert("Get MetaMask");
			}
		}
		catch (error) {
			alert("!Error connecting to account");
			console.error(error);
		}
		finally {
			console.log("Get Account Method");
		}
        };

	const mintAvatar = async function() {
		try {
			const amount = ethers.parseEther("166");
			const claimTxn = await iconContract.claimAvatar({value: amount});
			console.log("Attempt Claim Avatar", claimTxn);
		}
		catch (error) {
			alert("!Error minting");
			console.error(error);
		}
		finally {
			console.log("Mint Method");
		}
	};

	async function handleAvatarChange(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formJson = Object.fromEntries(formData.entries()); 

		try {
			const changeAvatarTxn = await iconContract.getIconURL(formJson.avatarID);
			setAvatarImg(changeAvatarTxn);
			console.log("Input Event :",formJson.avatarID);
		}
		catch (error) {
			alert("!Error Avatar Change");
			console.error(error);
		}
		finally {
			console.log("Avatar Change Method");
		}
	};

	const renderContent = function() {
		if (!account) {
			return (
				<div>
					<ConnectButton handleEvent={getAccount}/>
				</div>
			);
		}
		else if (account && iconContract) {
			return (
				<div>
					<MintPanel eventHandler={handleAvatarChange} mintHandler={mintAvatar} image={avatarImg} mintString={check}/>
				</div>
			);
		}
	};

	useEffect(() => {
		console.log("render");
		if (iconContract) {
			iconContract.on('Claim', (owner, tokenID) => {
			getNewImage(owner.toString(), tokenID.toString());
			});
		}
		return () => {
		if (iconContract) {
			iconContract.off('Claim', (owner, tokenID));
			console.log("Event Off");
			}
		}

	}, [iconContract]);

	return (
		<>
			<header>
				{check}
			</header>
			<div>
				{renderContent()}
			</div>
		</>
		)
}

export default App
