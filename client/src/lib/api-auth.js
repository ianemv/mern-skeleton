import { SERVER } from './consts.js'

const signin = async (user) => { 
	try {
		let response = await fetch(`${SERVER}/auth/signin`, { 
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json' 
		},
		credentials: 'omit', 
		//throwing CORS error if added
		body: JSON.stringify(user)
	})
		return await response.json() 
	} catch(err) {
		console.error(err) 
	}
}
const signout = async () => { 
		try {
		let response = await fetch(`${SERVER}/auth/signout`, { method: 'GET' }) 
		return await response.json()
		} catch(err) { 
		console.log(err)
		} 
}

export { signin, signout }	