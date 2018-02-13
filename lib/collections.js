import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

// Se crea e inicializa la colección 'appmeteor'
export const Appmeteor = new Mongo.Collection('appmeteor');

Meteor.methods({
	'notes.insert'(text) {
		check(text, String);

		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		// Inserta la nota en la colección
		Appmeteor.insert({
			text, createdAt: new Date(),
			owner: Meteor.userId(),
			username: Meteor.user().username,
		});
	},

	'notes.remove'(note) {
		check(note._id, String);

		// Valida que solo borre sus notas
		if (note.owner !== Meteor.userId()) {
			alert("Usted no está autorizado para borrar esta nota.");
			throw new Meteor.Error('not-authorized');
		}

		// Borra la nota de la colección
		Appmeteor.remove(note._id);
	},
});