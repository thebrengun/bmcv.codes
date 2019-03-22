import React, { useState } from 'react';
import Layout from '../components/Layout/Layout.js';
import styled from '@emotion/styled';
import { jsx, css } from '@emotion/core';

const validation = css`
	&:valid {
		background: #ffffff;
		border-color: #83db83;
	}

	&:focus:valid {
		border-color: #83db83;
	}

	&:focus:invalid {
		border-color: #333F54;
	}
`;

const blurredValidation = css`
	&:invalid {
		border-color: red;
	}

	&:focus:invalid {
		border-color: red;
	}
`;

const FormRow = styled.div`
	margin: ${props => props.theme.measurements.padding};
	display: flex;
	flex-direction: column;
`;

const Label = styled.label`
	margin: .5em 0;
`;

const Input = styled.input`
	border-radius: .25em;
	border-style: solid;
	border-color: #dddddd;
	border-width: .125em;
	font-size: 1em;
	padding: .25em .5em;
	font-family: inherit;
`;

const TextArea = Input.withComponent('textarea');
const ContactTextArea = styled(TextArea)`height: 25vh;`;

const FieldGroup = (props) => {
	const { el, attrs, id, labelText, helpText } = props;
	const [ valid, setValid ] = useState(false);
	const [ blurred, setBlurred ] = useState(false);

	const handleChange = (event) => setValid(event.target.validity.valid);
	const handleBlur = (event) => setBlurred(true);

	return (
		<FormRow>
			<Label htmlFor={id}>{labelText}</Label>
			{jsx(
				el, 
				{
					...attrs, 
					id,
					css: [validation, blurred ? blurredValidation : css``],
					onBlur: handleBlur,
					onChange: handleChange
				}
			)}
			{blurred && !valid && 
				<div css={css`color: red; font-size: .9em; margin: .25em 0;`}>
					{helpText || `${labelText} is required`}
				</div>
			}
		</FormRow>
	);
};

const ContactPage = () => {
	return (
		<Layout>
			<div
				css={css`
					@media(min-width: 768px) {
						margin: 0 4em;
					}

					@media(min-width: 1200px) {
						max-width: 950px;
						margin: 2em auto;
					}
				`}
			>
				<div 
					css={css`
						@media(min-width: 1200px) {
							margin: 2em 5em;
						}
					`}
				>
					<form>
						<FieldGroup 
							el={Input} 
							attrs={{type: 'name', required: 'required'}} 
							labelText="Name" 
							helpText="Your name is required"
							id='input-name'
						/>
						<FieldGroup 
							el={Input} 
							attrs={{type: 'email', required: 'required'}} 
							labelText={'Email'} 
							helpText="This is not a valid email address"
							id='input-email'
						/>
						<FieldGroup 
							el={ContactTextArea} 
							attrs={{required: 'required'}} 
							labelText={'Message'} 
							helpText="A message is required"
							id='textarea-message'
						/>
						<FormRow>
							<Input 
								type="submit" 
								css={css`
									background: #2B2D2D;
									border-color: #2B2D2D;
									color: #ffffff;
									font-size: 1em;
									font-family: inherit;
									text-transform: uppercase;
								`} 
							/>
						</FormRow>
					</form>
				</div>
			</div>
		</Layout>
	);
};

export default ContactPage;
