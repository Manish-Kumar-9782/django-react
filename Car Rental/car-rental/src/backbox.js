async function submitData(postUrl, formData) {
    try {
        const response = await fetch(postUrl, {
            method: "POST",
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const json = await response.json();
            const errorMessage = json?.message?.error || 'Unknown error';
            let message;

            switch (json?.state) {
                case "failed":
                    message = `Your request has failed, please check your data\nError: ${errorMessage}`;
                    break;
                case "rejected":
                    message = `Your request has been rejected, please check your request method type.\nError: ${errorMessage}`;
                    break;
                default:
                    message = `There was an error with your request\nError: ${errorMessage}`;
            }

            setRes({ status: response.status, message, state: json?.state || "Unknown", isRes: true });
            throw new Error(message);
        }

        const json = await response.json();
        console.log(json);
        if (json.state === "success") {
            setRes({ status: json.status, message: json.message.success, state: "success", isRes: true });
        }
        return json;

    } catch (error) {
        console.error(error);
        // Handle any additional error logging or state updates here if necessary
    }
}