import { FC } from "react";
import { composeClass } from "@src/common/utils";
import Card from "./Card";
import { Source } from "@src/common/typings";

const toplists = [
  { src: Source.qq, id: 26 },
  { src: Source.kw, id: 16 },
];

const HomeToplist: FC<{ className?: string }> = ({ className }) => {
  return (
    <section className={composeClass(className)}>
      <header className="text-2xl font-bold font-mono mb-2 text-neutral-700">
        排行榜
      </header>
      <ul className="w-full flex space-x-5">
        {toplists.map(({ src, id }, idx) => (
          <li className="flex-1" key={idx}>
            <Card src={src} id={id} className="w-full" />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default HomeToplist;
