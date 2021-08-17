// your javascript here

const onApprove = (data, actions) => {
    // This function captures the funds from the transaction.
    return actions.order.capture().then(function (details) {
        // This is where you would save the order to firebase and pouchdb
        console.log(details);
        alert("thank-you for your payment");
    });
}


$(document).ready(() => {
    const aPaypalButtons = $(".paypal_button");
    for (let n = 0; n < aPaypalButtons.length; n++) {
        let sCost = $(aPaypalButtons[n]).attr('data-cost');
        $(aPaypalButtons[n]).replaceWith(`<div id="${aPaypalButtons[n].id}" />`);
        paypal_sdk.Buttons({
            onApprove: onApprove,
            createOrder: function (data, actions) {
                // This function sets up the details of the transaction, including the amount and line item details.
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: sCost
                        }
                    }]
                });
            }
        }).render(`#${aPaypalButtons[n].id}`);
    }
});