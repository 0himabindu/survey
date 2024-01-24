import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useCallback, useRef, useState } from 'react';
import { Model } from 'survey-core';
const inter = Inter({ subsets: ['latin'] })
export const revalidate = 0;
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify"
import 'survey-core/defaultV2.min.css';
import { Survey } from 'survey-react-ui';
import axios from "axios"
import { ISurvey } from './models';
import { useRouter } from 'next/router';
const surveyJson =
{
  "title": "Customer Survey",
  "logoPosition": "right",
  "completedBeforeHtml": "<h3>Seems you have already filled the survey.</h3>",

  "pages": [
{
      "elements": [{
        "type": "html",
        "html": "<h4>Welcome to the Survey</h4>"
      }]
    },
    {
      "name": "page1",
      "elements": [
        {
          "type": "rating",
          "name": "question1",
          "title": "How satisfied are you with our products?",
        }
      ],
      "title": "1/5"
    },
    {
      "name": "page2",
      "elements": [
        {
          "type": "rating",
          "name": "question2",
          "title": "How fair are the prices compared to similar retailers?",
        }
      ],
      "title": "2/5"
    },
    {
      "name": "page3",
      "elements": [
        {
          "type": "rating",
          "name": "question3",
          "title": "How satisfied are you with the value for money of your purchase?",
        }
      ],
      "title": "3/5"
    },
    {
      "name": "page4",
      "elements": [
        {
          "type": "rating",
          "name": "question4",
          "title": "On a scale of 1-10 how would you recommend us to your friends and family?",
          "rateCount": 10,
          "rateMax": 10
        }
      ],
      "title": "4/5"
    }
  ],
  "showPreviewBeforeComplete": "showAnsweredQuestions",
  "progressBarType": "questions",
  "firstPageIsStarted": true,
  "startSurveyText": "Take the Survey",
}

export default function Home() {
  const survey = useRef(new Model(surveyJson)).current;
  const router = useRouter()
  const displayResults = useCallback(async (sender: any) => {
    let x = sender.data
    try {
      const Data: Partial<ISurvey> = {
        How_satisfied_are_you_with_our_products: x.question1,
        How_fair_are_the_prices_compared_to_similar_retailers: x.question2,
        How_satisfied_are_you_with_the_value_for_money_of_your_purchase: x.question3,
        how_would_you_recommend_us_to_your_friends_and_family: x.question4,
        What_could_we_do_to_improve_our_service: x.question6
      };
      const res: any = await axios.post("/api/hello", Data)
      if (res.data.success) {
        router.push("/");
        toast.success("Response Submitted Successfully!")
      } else {
        toast.error("Error Submitting The Form")

      }
      // if(res.data)
    } catch (err) {
      console.log(err)

    }

  }, []);

  survey.onComplete.add(displayResults);

  return (
    <>
      <ToastContainer />
      <main
        className={`flex min-h-screen flex-col items-center justify-between ${inter.className}`}
      >
    <Survey model={survey} id="surveyContainer" />
</main>
</>
)
}
