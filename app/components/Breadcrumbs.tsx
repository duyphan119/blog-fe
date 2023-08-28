"use client";

import Link from "next/link";
import { CSSProperties, Fragment, memo, FC } from "react";

type Props = Partial<{
  links: {
    label: string;
    href: string;
    style?: CSSProperties;
  }[];
  current: string;
  currentStyle: CSSProperties;
  style: CSSProperties;
  currentWrap: boolean;
}>;

const Breadcrumbs: FC<Props> = ({
  links,
  current,
  currentStyle,
  style,
  currentWrap,
}) => {
  const currentElement = <strong>{current}</strong>;
  return (
    <div
      className="flex-wrap flex justify-center"
      style={{
        ...style,
      }}
    >
      {(links || []).map(({ label, href, style }, index) => {
        return (
          <Fragment key={label}>
            {index !== 0 ? <>&nbsp;&nbsp;/&nbsp;&nbsp;</> : ""}
            <Link
              href={href}
              style={{ ...style }}
              className="hover:text-darkpink cursor-pointer"
            >
              {label}
            </Link>
          </Fragment>
        );
      })}
      {currentWrap ? (
        <div
          style={{ ...currentStyle }}
          className="text-darkpink w-full text-xl text-center"
        >
          {currentElement}
        </div>
      ) : (
        <Fragment>
          &nbsp;&nbsp;/&nbsp;&nbsp;
          <div
            style={{
              ...currentStyle,
            }}
            className="text-darkpink"
          >
            {currentElement}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default memo(Breadcrumbs);
