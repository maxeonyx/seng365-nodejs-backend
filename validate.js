const mysql = require('mysql');
const joi = require('joi');



const sc = {
	user: {
		id: joi.number().integer().positive(),
		username: joi.string().regex(/^[-a-zA-Z0-9_]{3,200}$/),
		email: joi.string().email(),
		location: joi.string().allow(null)
	},
	password: joi.string().min(6),
	token: joi.string().regex(/^[0-9a-fA-F]{138}$/),
	project: {
		title: joi.string(),
		subtitle: joi.string(),
		description: joi.string(),
		imageUri: joi.string().uri({scheme: ['http', 'https'], allowRelative: true}),
		target: joi.number().positive().precision(4),
		creators: joi.array().min(1).items({
			id: joi.number().integer().positive().required(),
			name: joi.string()
		}).unique("id"),
		rewards: joi.array().items({
			id: joi.number().integer().positive(),
			amount: joi.number().positive().precision(4).required(),
			description: joi.string().required()
		}).unique("id"),
	}
};

module.exports = (schema, obj) => {
		return joi.validate(obj, schema);
};

module.exports.schema = {
	id: sc.user.id,
	token: sc.token,
	createUser: {
		user: {
			username: sc.user.username.required(),
			email: sc.user.email.required(),
			location: sc.user.location
		},
		password: sc.password.required()
	},
	updateUser: {
		user: sc.user,
		password: sc.password
	},
	login: {
		username: sc.user.username,
		password: sc.password
	},
	createProject: {
		title: sc.project.title.required(),
		target: sc.project.target.required(),
		creators: sc.project.creators.required(),
		rewards: sc.project.rewards.required(),
		subtitle: sc.project.subtitle,
		description: sc.project.description,
		imageUri: sc.project.imageUri
	}
};