import style from "../template.module.css";

const Arrow = () => (
  <div className={style.arrowContainer}>
		<div className={style.arrow}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="125"
				height="649"
				viewBox="0 0 125 649"
				fill="none">
				<path
					d="M0 0L125 273.548V405.318L0 649V0Z"
					fill="url(#paint0_linear_30_118)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_30_118"
						x1="134.259"
						y1="324.5"
						x2="2.23712e-06"
						y2="324.5"
						gradientUnits="userSpaceOnUse">
						<stop stopColor="#00D4FF" stopOpacity="0.7" />
						<stop offset="1" stopColor="#00D4FF" stopOpacity="0" />
					</linearGradient>
				</defs>
			</svg>
		</div>
		<div
			style={{
				color: "var(--primary-50)",
				fontSize: "2rem",
				fontWeight: "bold",
				textAlign: "center",
			}}>
			Select <br /> Template <br />
			to Start
		</div>
	</div>
);
export default Arrow;
