import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Appmeteor } from '../lib/collections.js';
import { Accounts } from 'meteor/accounts-base';
import './main.html';

// Configuración de cuenta
Accounts.ui.config({
	passwordSignupFields: 'USERNAME_ONLY'
});

// Busca y trae todos los archivos de la base de datos
Template.body.helpers({
	appmeteor: function() {
	  	return Appmeteor.find({});
	}
});

// Agrega la nota
Template.add.events({ 
	'submit .add-form': function() {
		event.preventDefault();

		// Obtiene el valor de entrada
		const target = event.target;
		const text = target.text.value;

		// Llama al método que inserta la nota en la colección
		Meteor.call('notes.insert', text);

		// Limpia el formulario
		target.text.value = "";

		// Cierra modal
		$("#addModal").modal("close");

		return false;
	}
});

// Borra la nota
Template.notas.events({
	'click .delete-note': function() {
		// Llama al método que borra la nota de la colección
		Meteor.call('notes.remove', this);
		return false;
	}
})