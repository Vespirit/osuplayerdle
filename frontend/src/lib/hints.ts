export const numberHint = (sol: number | undefined, p: number | undefined) => {
    if (!sol || !p) return ""; // if theyre undefined

    if (sol === p) {
        return "✅";
    } else if (sol > p) {
        return "⬆️";
    } else return "⬇️";
};

export const countryHint = (sol: string | undefined, p: string | undefined) => {
    if (!sol || !p) return ""; // if theyre undefined

    if (sol === p) {
        return "✅";
    } else return "❌";
};

export const rankHint = (sol: number | undefined, p: number | undefined) => {
    if (!sol || !p) return ""; // if theyre undefined

    if (sol === p) {
        return "✅";
    } else if (sol < p) {
        return "⬆️";
    } else return "⬇️";
};
