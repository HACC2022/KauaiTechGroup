import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { DataContext } from "../../../hooks/useData";

interface FormValues {
  id: string;
  xAxis: string;
  yAxis: string;
}

interface Props {
  setChartData: Dispatch<SetStateAction<ChartData>>;
}

export function LineChartForm({ setChartData }: Props) {
  const value = useContext(DataContext);

  return (
    <div>
      <Formik
        initialValues={{
          id: "",
          xAxis: "",
          yAxis: "",
        }}
        onSubmit={(
          formValues: FormValues,
          { setSubmitting }: FormikHelpers<FormValues>
        ) => {
          setTimeout(() => {
            var chartData = mapToChart(
              value?.data.data,
              formValues.id,
              formValues.xAxis,
              formValues.yAxis
            );
            setChartData(chartData);
            setSubmitting(false);
          }, 500);
        }}
      >
        <Form>
          <h2 className="block text-xl font-medium text-gray-700 mb-5">
            Series ID
          </h2>
          <label
            htmlFor="id"
            className="block text-sm font-medium text-gray-700"
          >
            Select Column
          </label>
          <Field
            as="select"
            id="id"
            name="id"
            className="mt-1 mb-6 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          >
            {value?.data.columns.map((column) => {
              return <option value={column.id}>{column.id}</option>;
            })}
          </Field>
          <h2 className="block text-xl font-medium text-gray-700 mb-5">
            Horizontal Axis
          </h2>
          <label
            htmlFor="xAxis"
            className="block text-sm font-medium text-gray-700"
          >
            Select Column
          </label>
          <Field
            as="select"
            id="xAxis"
            name="xAxis"
            className="mt-1 mb-6 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          >
            {value?.data.columns.map((column) => {
              return <option value={column.id}>{column.id}</option>;
            })}
          </Field>
          <h2 className="block text-xl font-medium text-gray-700 mb-5">
            Vertical Axis
          </h2>
          <label
            htmlFor="yAxis"
            className="block text-sm font-medium text-gray-700"
          >
            Select Column
          </label>
          <Field
            as="select"
            id="yAxis"
            name="yAxis"
            className="mt-1 mb-6 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          >
            {value?.data.columns.map((column) => {
              return <option value={column.id}>{column.id}</option>;
            })}
          </Field>
          <button
            className="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            type="submit"
          >
            Update Chart
          </button>
        </Form>
      </Formik>
    </div>
  );
}

function mapToChart(
  value: ColumnDetails[],
  key: string,
  xAxis: string,
  yAxis: string
): ChartData {
  var arr: ChartData = [
    {
      id: key,
      data: value
        .map((row) => ({
          x: row[xAxis],
          y: row[yAxis],
        }))
        .filter((o) => o.y != null || o.x != null),
    },
  ];
  console.log(arr);
  return arr;
}

const groupByToMap = <T, Q>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => Q
) =>
  array.reduce((map, value, index, array) => {
    const key = predicate(value, index, array);
    map.get(key)?.push(value) ?? map.set(key, [value]);
    return map;
  }, new Map<Q, T[]>());
