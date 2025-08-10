"use client";
import { getAllCountries, getCountryByValue } from "@/lib/countries";

const useCountries = () => {
  const getAll = () => getAllCountries();
  const getByValue = (value) => getCountryByValue(value);

  return { getAll, getByValue };
};

export default useCountries;
