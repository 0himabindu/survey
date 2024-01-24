import mongoose from "mongoose";

 export interface ISurvey extends mongoose.Document {

    How_satisfied_are_you_with_our_products?: number;
    How_fair_are_the_prices_compared_to_similar_retailers?: number;
    How_satisfied_are_you_with_the_value_for_money_of_your_purchase?: number;
    how_would_you_recommend_us_to_your_friends_and_family?: number;
    What_could_we_do_to_improve_our_service?: string
}

const SurveySchema = new mongoose.Schema<ISurvey>({
    How_satisfied_are_you_with_our_products: {
        type: Number,
        max: 5
    },
    How_fair_are_the_prices_compared_to_similar_retailers: {
        type: Number,
        max: 5
    },
    How_satisfied_are_you_with_the_value_for_money_of_your_purchase: {
        type: Number,
        max: 5
    },
    how_would_you_recommend_us_to_your_friends_and_family: {
        type: Number,
        max: 10
    },
    What_could_we_do_to_improve_our_service: {
        type: String,
        maxlength:[200, "Please Enter within 200 Characters"]
    },

});

export default mongoose.models.Survey || mongoose.model<ISurvey>("Survey", SurveySchema);