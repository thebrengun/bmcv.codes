import React, { useState } from 'react';
import Layout from '../components/Layout/Layout.js';
import SEO from '../components/seo.js';
import styled from '@emotion/styled';
import { jsx, css } from '@emotion/core';
import { navigate } from 'gatsby-link';

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
	padding: .5em .5em;
	font-family: inherit;
`;

const TextArea = Input.withComponent('textarea');
const ContactTextArea = styled(TextArea)`height: 25vh;`;

const FieldGroup = (props) => {
	const { el, attrs, id, labelText, helpText, value, setValue, hidden = false } = props;

	const [ valid, setValid ] = useState(false);
	const [ blurred, setBlurred ] = useState(false);

	const handleChange = (event) => {
		setValue(event.target.value);
		if(attrs.required) {
			setValid(event.target.validity.valid);
		}
	};
	const handleBlur = (event) => {
		if(attrs.required) {
			setBlurred(true);
		}
	};

	const elCss = attrs.required ? [validation, blurred ? blurredValidation : css``] : [];

	return (
		<FormRow css={css`${hidden ? `display: none;` : ``}`}>
			<Label htmlFor={id}>{labelText}</Label>
			{jsx(
				el, 
				{
					...attrs, 
					value,
					id,
					css: elCss,
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

const encode = (data) => Object.keys(data).map(
	key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
).join('&');

const ContactPage = () => {

	const [ honey, setHoney ] = useState('');
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ message, setMessage ] = useState('');
	const [ submitted, setSubmitted ] = useState(false);
	const [ failedSubmit, setFailedSubmit ] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		const form = e.target;
		setSubmitted(true);
		if(failedSubmit) {
			setFailedSubmit(false);
		}

		fetch('/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: encode({
				'form-name': form.getAttribute('name'),
				'bot-field': honey, name, email, message
			})
		}).then(
			() => navigate(form.getAttribute("action"))
		).catch(
			(error) => {
				setFailedSubmit(true);
				setSubmitted(false);
			}
		);
	};

	return (
		<Layout>
			<SEO title={`Contact`} />
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
					<form 
						name="contact"
						method="post"
						action="/thanks/"
						data-netlify="true"
						data-netlify-honeypot="bot-field"
						onSubmit={handleSubmit}
					>
						<input type="hidden" name="form-name" value="contact" />
						<FieldGroup 
							hidden={true} 
							el={Input} 
							attrs={{name: 'bot-field'}} 
							labelText="Leave this field blank" 
							id='input-honey'
							value={honey}
							setValue={setHoney}
						/>
						<FieldGroup 
							el={Input} 
							attrs={{name: 'name', type: 'name', required: 'required', disabled: submitted}} 
							labelText="Name" 
							helpText="Your name is required"
							id='input-name'
							value={name}
							setValue={setName}
						/>
						<FieldGroup 
							el={Input} 
							attrs={{name: 'email', type: 'email', required: 'required', disabled: submitted}} 
							labelText={'Email'} 
							helpText="This is not a valid email address"
							id='input-email'
							value={email}
							setValue={setEmail}
						/>
						<FieldGroup 
							el={ContactTextArea} 
							attrs={{name: 'message', required: 'required', disabled: submitted}} 
							labelText={'Message'} 
							helpText="A message is required"
							id='textarea-message'
							value={message}
							setValue={setMessage}
						/>
						<FormRow>
							<Input 
								type="submit" 
								disabled={submitted} 
								css={css`
									background: #2B2D2D;
									border-color: #2B2D2D;
									color: #ffffff;
									font-size: 1em;
									font-family: inherit;
									text-transform: uppercase;

									&:disabled {
										opacity: .5;
									}
								`} 
							/>
							{failedSubmit && 
								<div css={css`color: red; margin-top: 1em;`}>
									<span css={css`display: block;`}>Your message was not submitted!</span>
									<span css={css`display: block;`}>Try submitting again.</span>
								</div>
							}
						</FormRow>
					</form>
				</div>
			</div>
		</Layout>
	);
};

export default ContactPage;
