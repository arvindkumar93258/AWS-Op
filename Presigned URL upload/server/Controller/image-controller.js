import generateSignedUrl from "../s3.js"


export const getSignedUrl = async (request, response) => {
    try {
        const url = await generateSignedUrl();
        return response.status(200).json({ url });
    } catch (error) {
        console.log("\n\nError: \n\n", error.message ?? "", "\n\n");
        return response.status(500).json({
            message: "Error in file uploading",
            error
        });

    }
}
