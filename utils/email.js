export const getDataFromEmails = async (campaignId, data) => {
    const objectIds = [];

    for (let item of data) {
        const bodyData = {
            campaignId,
            emailText: item.body
        };

        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/emailData/create", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyData)
            });
            
            if (response.ok) {
                const result = await response.json();
                console.log("Result From Email Creation: " + JSON.stringify(result));
                objectIds.push(result._id);
            } else {
                console.error(`Error while posting data for item: ${item.body}. Status: ${response.status}`);
            }
        } catch (error) {
            console.error(`Error while posting data for item: ${item.body}. Error: ${error}`);
        }
    }

    return objectIds;
};
