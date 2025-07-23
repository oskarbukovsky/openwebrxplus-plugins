/*
 * Plugin: more steps by oskarbukovsky.
 *
 * License: MIT
 * Copyright (c) 2025 Jan Oskar Bukovský
 */

// do not load CSS for this plugin
Plugins.more_steps.no_css = true;

Plugins.more_steps.more_steps_defaults = [100000, 1000000, 10000000, 100000000]; // 100kHz, 1MHz, 10MHz, 100MHz

// Initialize the plugin
Plugins.more_steps.init = async function () {

  // Check if utils plugin is loaded
  if (!Plugins.isLoaded('utils', 0.1)) {
    // try to load the utils plugin
    await Plugins.load('https://0xaf.github.io/openwebrxplus-plugins/receiver/utils/utils.js');

    // check again if it was loaded successfully
    if (!Plugins.isLoaded('utils', 0.1)) {
      console.error('more_steps plugin depends on "utils >= 0.1".');
      return false;
    } else {
      Plugins._debug('Plugin "utils" has been loaded as dependency.');
    }
  }

  //Helper function to show units
  function parseMagnitude(value) {
    const magnitudes = ["Hz", "kHz", "MHz", "GHz", "THz"]; //Idk who will use THZ, but anyway..
    let result = value;
    let magnitude = 0;
    while (value >= 1000) {
      value /= 1000;
      magnitude++;
    }
    return value + magnitudes[magnitude];
  }

  var sel = $('#openwebrx-tuning-step-listbox');

  // if the list is empty, return
  if (!sel[0] || !sel[0].length)
    return;

  (Plugins.more_steps_custom ?? Plugins.more_steps.more_steps_defaults).forEach((step) => {
    let newStep = document.createElement("option");
    newStep.value = step;
    newStep.textContent = parseMagnitude(step);
    sel.append($("<option></option>").val(step).text(parseMagnitude(step)));
  });

  var selected = sel.val();
  var list = sel.find('option');

  // sort the list of steps
  list.sort(function (a, b) {
    return $(a).val()
      .localeCompare(
        $(b).val(), undefined, {
          numeric: true,
          sensitivity: 'base'
        }
      );
  });

  // now reset the list and fill it with the new extended one
  sel.html('').append(list);

  // set the selected step from our cached value
  sel.val(selected);

  // return true to validate plugin load
  return true;
}
