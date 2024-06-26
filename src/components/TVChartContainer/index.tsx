import styles from "./index.module.css";
import { useEffect, useRef } from "react";
import { ChartingLibraryWidgetOptions, LanguageCode, ResolutionString, widget} from "../../../public/static/charting_library";

export const TVChartContainer = (props: Partial<ChartingLibraryWidgetOptions>) => {
	const chartContainerRef =
		useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

	useEffect(() => {
		const widgetOptions: ChartingLibraryWidgetOptions = {
			symbol: props.symbol,
			// BEWARE: no trailing slash is expected in feed URL
			datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(
				"http://localhost:8080",
				undefined,
				{
					maxResponseLength: 1000,
					expectedOrder: "latestFirst",
				}
			),
			interval: props.interval as ResolutionString,
			container: chartContainerRef.current,
			library_path: props.library_path,
			locale: props.locale as LanguageCode,
			disabled_features: ["use_localstorage_for_settings"],
			enabled_features: ["study_templates"],
			charts_storage_url: props.charts_storage_url,
			charts_storage_api_version: props.charts_storage_api_version,
			client_id: props.client_id,
			user_id: props.user_id,
			fullscreen: props.fullscreen,
			theme: props.theme,
			autosize: props.autosize,
			custom_css_url: 'css/style.css',
			overrides: {
				"paneProperties.backgroundType": "solid",
				"paneProperties.background": "#000000",
				"mainSeriesProperties.showCountdown":true,

			}
		};
		const tvWidget = new widget(widgetOptions);
		
		tvWidget.onChartReady(() => {
			tvWidget.activeChart().createStudy('MACD', false, false, { in_0: 14, in_1: 30, in_3: 'close', in_2: 9 });		  
			tvWidget.activeChart().createStudy('Moving Average Exponential', false, false, { length: 26 });
			tvWidget.activeChart().createShape(
				  { time: 1521763200, channel: "low" },
				  { shape: "arrow_up", text: "Buy" }
				);
			  tvWidget.activeChart().createShape(
				  { time: 1520899200, channel: "high" },
				  { shape: "arrow_down", text: "Sell" }
				);
				
			tvWidget.headerReady().then(() => {
				const button = tvWidget.createButton();
				button.setAttribute("title", "Click to show a notification popup");
				button.classList.add("apply-common-tooltip");
				button.addEventListener("click", () =>
					tvWidget.showNoticeDialog({
						title: "Notification",
						body: "TradingView Charting Library API works correctly",
						callback: () => {
							console.log("Noticed!");
						},
					})
				);

				button.innerHTML = "Check API";
				
			});
			
		});

		return () => {
			tvWidget.remove();
		};
		
	}, [props]);
	return (
		<>
			<div ref={chartContainerRef} className={styles.TVChartContainer} />
		</>
	);
};
