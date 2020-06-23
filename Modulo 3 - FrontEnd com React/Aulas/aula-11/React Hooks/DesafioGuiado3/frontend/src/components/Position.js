import React from "react";
import css from "./position.module.css";

export default function Position({ children }) {
  return <div className={css.position}>{children}</div>;
}

// import React from "react";
// import CountUp from "react-countup";

// export default function Votes() {
//   return (
//     <div>
//       <CountUp start={previous} end={value} duration={0.6} separator=".">
//         {({ countUpRef }) => (
//           <div>
//             <span ref={countUpRef} />
//           </div>
//         )}
//       </CountUp>
//     </div>
//   );
// }
