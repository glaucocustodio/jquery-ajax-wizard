# jQuery Ajax Wizard

### A form wizard plugin for when next step is gotten via AJAX based on user's input

## When to use

You have a multi steps form but just know the first step, the further steps rely on user's input. When user fills up first step and goes forward, an AJAX request is made posting user's input and next step is filled with the returned HTML.

A hash from each step is generated, so, a new AJAX request only is made to a already gotten step (in case of regression) if some data has been changed.

## Usage

1. Include jQuery:

	```html
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	```

2. Include plugin's code:

	```html
	<script src="dist/jquery.ajaxWizard.min.js"></script>
	```

3. Call the plugin:

	```javascript
	$("#element").ajaxWizard({
		// options and callbacks
	});
	```

## Contributing

Check [CONTRIBUTING.md](https://github.com/glaucocustodio/jquery-ajax-wizard/blob/master/CONTRIBUTING.md) for more information.

## License

This projected is licensed under the terms of the MIT license.