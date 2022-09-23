import React, { ForwardedRef, forwardRef } from 'react';
import clsx from 'clsx';

const OuterContainer = forwardRef(function OuterContainer(
  {
    className,
    children,
    ...props
  }: { className?: string; children: React.ReactNode; [x: string]: any },
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <div ref={ref} className={clsx('sm:px-8', className)} {...props}>
      <div className="mx-auto max-w-7xl lg:px-8">{children}</div>
    </div>
  );
});

const InnerContainer = forwardRef(function InnerContainer(
  {
    className,
    children,
    ...props
  }: { className?: string; children: React.ReactNode; [x: string]: any },
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={clsx('relative px-4 sm:px-8 lg:px-12', className)}
      {...props}
    >
      <div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
    </div>
  );
});

interface Props {
  children?: React.ReactNode;
  className?: string;
}

export interface CompoundedContainer
  extends React.ForwardRefExoticComponent<
    Props & React.RefAttributes<HTMLDivElement>
  > {
  Outer: React.ForwardRefExoticComponent<
    Props & React.RefAttributes<HTMLDivElement>
  >;
  Inner: React.ForwardRefExoticComponent<
    Props & React.RefAttributes<HTMLDivElement>
  >;
}

export const Container = React.forwardRef(function Container(
  { children, ...props }: { children: React.ReactNode; [x: string]: any },
  ref: ForwardedRef<HTMLDivElement>
): JSX.Element {
  return (
    <OuterContainer ref={ref} {...props}>
      <InnerContainer>{children}</InnerContainer>
    </OuterContainer>
  );
}) as CompoundedContainer;

Container.Outer = OuterContainer;
Container.Inner = InnerContainer;
