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
	```html
		<form id="my-form">
			<fieldset>
				<input type="text" name="name" class="required"/>
				<a href="javascript:void(0)" class="custom-forward-selector">forward</a>
			</fieldset>
			<!-- jQuery Ajax Wizard will place the returned HTML from AJAX in further fieldsteps -->
		</form>
	```

	```javascript
	$("#my-form").ajaxWizard({
		// options and callbacks
	});
	```

## Options and Callbacks

Here's a list of available options and callbacks.

```javascript
$("#my-form").ajaxWizard({
  contentUrl: '/my/api/url',
  beforeForward: function(form){
    // validates form with jQuery Validation plugin before forward
    return $(form).valid();
  },
  controlSelectors: {
    forward:  '.custom-forward-selector',
    backward: '.custom-backward-selector'
  }
});
```

Attribute			       | Type				  | Required	| Description
---						       | ---					| ---				| ---
`contentUrl`         | *String*		  | `yes`		  | Url for AJAX submission.
`forward`		         | *String*		  | `no`		  | jQuery compatible selector.
`backward`	         | *String*		  | `no`		  | jQuery compatible selector.
`beforeForward`	     | *Function*		| `no`		  | Before forward callback. It must return `true` to continue.
`afterForward`	     | *Function*		| `no`		  | After forward callback. Fired after a new AJAX request (when current step not yet cached or when data has been changed).
`afterCachedForward` | *Function*		| `no`		  | After forward callback. Fired after a cached step be displayed (no AJAX request).
`beforeBackward`	   | *Function*		| `no`		  | Before backward callback. It must return `true` to continue.
`afterBackward`	     | *Function*		| `no`		  | After backward callback.


## Contributing

Check [CONTRIBUTING.md](https://github.com/glaucocustodio/jquery-ajax-wizard/blob/master/CONTRIBUTING.md) for more information.

## License

This projected is licensed under the terms of the MIT license.