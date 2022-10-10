import './App.css';
import { useMultistepForm } from './useMultistepForm';
import { UserForm } from './UserForm';
import { AddressForm } from './AddressForm';
import { AccountForm } from './AccountForm';
import { FormEvent, useState } from 'react';

type FormData = {
	firstName: string;
	lastName: string;
	age: string;
	street: string;
	city: string;
	state: string;
	zip: string;
	email: string;
	password: string;
};
const INITIAL_DATA: FormData = {
	firstName: '',
	lastName: '',
	age: '',
	street: '',
	city: '',
	state: '',
	zip: '',
	email: '',
	password: '',
};
function App() {
	const [data, setData] = useState(INITIAL_DATA);

	function updateFields(fields: Partial<FormData>) {
		setData((prev) => {
			return { ...prev, ...fields };
		});
	}
	const { currentStepIndex, steps, step, isFirstStep, isLastStep, back, next } =
		useMultistepForm([
			<UserForm {...data} updateFields={updateFields} />,
			<AddressForm {...data} updateFields={updateFields} />,
			<AccountForm {...data} updateFields={updateFields} />,
		]);

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!isLastStep) return next();
		alert('Successful Account Creation');
	};
	return (
		<>
			<h1 style={{ textAlign: 'center' }}>Typescript Multi Form Component</h1>
			<div className='container'>
				<form onSubmit={onSubmit}>
					<div className='step-number'>
						{currentStepIndex + 1}/{steps.length}
					</div>
					{step}
					<div className='buttons'>
						{!isFirstStep && (
							<button type='button' onClick={back}>
								Back
							</button>
						)}
						<button type='submit'>{isLastStep ? 'Finish' : 'Next'}</button>
					</div>
				</form>
			</div>
		</>
	);
}

export default App;
