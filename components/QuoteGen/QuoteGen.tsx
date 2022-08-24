import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import axios from "axios";
import { Button, Typography, Input, Alert } from "@material-tailwind/react";
import Timer from "../Timer/Timer";
const QuoteGen: NextPage = () => {
  const [array, setArray] = useState<string[]>([]);
  const [author, setAuthor] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [generate, setGenerate] = useState<number>(0);
  const [focus, setFocus] = useState<number>(0);
  const [words, setWords] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(60);
  const [input, setInput] = useState<boolean>(false);
  const [bool, setBool] = useState<boolean>(true);
  const api = async () => {
    const response = await axios.get(
      "https://api.quotable.io/random?minLength=200"
    );
    setArray(response.data.content.split(" "));
    setAuthor(response.data.author);
    setValue("");
    setFocus(0);
    setWords(0);
    setInput(false);
    setBool(true);
  };
  useEffect(() => {
    api();
  }, [generate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((p) => p - 1);
    }, 1000);
    if (seconds <= 0) {
      clearInterval(interval);
      console.log(seconds);
    }
    return () => clearInterval(interval);
  }, [bool, seconds]);
  const handleChange = (e: any) => {
    setValue(e.target.value);
    if (bool) {
      setSeconds(60);
      setBool(false);
    }
  };
  const handleClick = () => {
    setGenerate((p) => p + 1);
  };
  console.log(bool);
  useEffect(() => {
    if (seconds <= 0) {
      setBool(true);
      setInput(true);
    }
  }, [seconds]);
  return (
    <div>
      <Typography
        className="mt-4 relative bg-gray-100 p-3 quote"
        variant="lead"
      >
        <p className="text-gray-700">
          {array.map((e, i) => {
            if (value === e + " ") {
              setFocus((p) => p + 1);
              setWords((p) => p + 1);
              setValue("");
            }
            return (
              <span key={i} className={focus === i ? "focus" : ""}>
                {e}{" "}
              </span>
            );
          })}
        </p>
        <p className="block text-gray-500 text-right mr-8">
          &ldquo;{author}&rdquo;
        </p>

        <Button
          color="amber"
          variant="gradient"
          className="mt-3 rounded-none"
          ripple={true}
          onClick={handleClick}
        >
          Change Text
        </Button>
      </Typography>
      {!bool && (
        <Alert className="mt-4 rounded-none" variant="gradient">
          00:00:{seconds < 10 ? "0" + seconds : seconds}
        </Alert>
      )}
      <div className="flex w-full items-end gap-4 mt-6">
        <Input
          variant="static"
          label="Start typing"
          size="lg"
          disabled={input}
          placeholder={array[focus]}
          value={value}
          onChange={handleChange}
        />
      </div>
      {seconds === 0 && (
        <div>
          <Alert className="mt-4" variant="gradient" color="green">
            <p>words written {words}</p>
            <p>{words} per minutes </p>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default QuoteGen;
function i(i: any) {
  throw new Error("Function not implemented.");
}
function interval(interval: any) {
  throw new Error("Function not implemented.");
}
