import React, { useState } from 'react'
import { useNavigate } from 'react-router'; 
const Search = ({ history }) => {
	let navigate = useNavigate();
	const [keyword, setKeyword] = useState('');

	const searchHandler = (e) => {

		e.preventDefault()

		if(keyword.trim()){
			navigate(`/search/${keyword}`)
		} else {
			navigate('/')
		}
}


	return (
	<form onSubmit={ searchHandler }>

	</form>
		)
}

export default Search