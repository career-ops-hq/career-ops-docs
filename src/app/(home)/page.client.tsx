'use client';

import {
  type ComponentProps,
  Fragment,
  type HTMLAttributes,
  type ReactElement,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/cn';

const GrainGradient = dynamic(
  () => import('@paper-design/shaders-react').then((mod) => mod.GrainGradient),
  { ssr: false },
);

const Dithering = dynamic(
  () => import('@paper-design/shaders-react').then((mod) => mod.Dithering),
  { ssr: false },
);

export function Hero() {
  const { resolvedTheme } = useTheme();
  const [showShaders, setShowShaders] = useState(false);

  useEffect(() => {
    // Skip the WebGL shader render loop for visitors who opted into
    // reduced motion at the OS level. Saves ~140KB JS execution +
    // continuous GPU work on low-end mobile.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Defer mount to browser idle so the shader work doesn't compete with
    // LCP / hydration. Safari lacks requestIdleCallback — fall back to a
    // short setTimeout. The 2s timeout guarantees the shaders eventually
    // render even on a busy main thread.
    const ric = (window as Window & {
      requestIdleCallback?: (
        cb: () => void,
        opts?: { timeout?: number },
      ) => number;
      cancelIdleCallback?: (id: number) => void;
    }).requestIdleCallback;

    if (typeof ric === 'function') {
      const id = ric(() => setShowShaders(true), { timeout: 2000 });
      return () => {
        const cic = (window as Window & {
          cancelIdleCallback?: (id: number) => void;
        }).cancelIdleCallback;
        if (typeof cic === 'function') cic(id);
      };
    }
    const t = setTimeout(() => setShowShaders(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {showShaders && (
        <GrainGradient
          className="absolute inset-0 animate-fd-fade-in duration-800"
          colors={
            resolvedTheme === 'dark'
              ? ['#39BE1C', '#9c2f05', '#7A2A0000']
              : ['#fcfc51', '#ffa057', '#7A2A0020']
          }
          colorBack="#00000000"
          softness={1}
          intensity={0.9}
          noise={0.5}
          speed={1}
          shape="corners"
          minPixelRatio={1}
          maxPixelCount={1920 * 1080}
        />
      )}

      {showShaders && (
        <Dithering
          width={720}
          height={720}
          colorBack="#00000000"
          colorFront={resolvedTheme === 'dark' ? '#DF3F00' : '#fa8023'}
          shape="sphere"
          type="4x4"
          scale={0.5}
          size={3}
          speed={0}
          frame={5000 * 120}
          className="absolute animate-fd-fade-in duration-400 max-lg:bottom-[-50%] max-lg:left-[-200px] lg:top-[-5%] lg:right-0"
          minPixelRatio={1}
        />
      )}
    </>
  );
}

export function CreateAppAnimation(props: ComponentProps<'div'>) {
  const installCmd = '/career-ops auto-pipeline https://jobs.acme.com/sr-engineer';
  const tickTime = 100;
  const timeCommandEnter = installCmd.length;
  const timeCommandRun = timeCommandEnter + 3;
  const timeCommandEnd = timeCommandRun + 3;
  const timeWindowOpen = timeCommandEnd + 1;
  const timeEnd = timeWindowOpen + 1;

  const [tick, setTick] = useState(timeEnd);

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((prev) => (prev >= timeEnd ? prev : prev + 1));
    }, tickTime);
    return () => clearInterval(timer);
  }, [timeEnd]);

  const lines: ReactElement[] = [];

  lines.push(
    <span key="command_type">
      {installCmd.substring(0, tick)}
      {tick < timeCommandEnter && (
        <div className="inline-block h-3 w-1 animate-pulse bg-fd-foreground" />
      )}
    </span>,
  );

  if (tick >= timeCommandEnter) {
    lines.push(<span key="space"> </span>);
  }

  if (tick > timeCommandRun)
    lines.push(
      <Fragment key="command_response">
        {tick > timeCommandRun + 1 && (
          <>
            <span className="font-medium">◆ Reading job description...</span>
            <span>│ Acme Corp — Senior Engineer (Remote)</span>
          </>
        )}
        {tick > timeCommandRun + 2 && (
          <>
            <span className="font-medium">◆ Scoring against your CV...</span>
            <span>│ Role fit · Comp · Remote policy</span>
          </>
        )}
        {tick > timeCommandRun + 3 && (
          <>
            <span className="font-medium">◆ Generating tailored resume...</span>
          </>
        )}
      </Fragment>,
    );

  return (
    <div
      {...props}
      onMouseEnter={() => {
        if (tick >= timeEnd) setTick(0);
      }}
    >
      {tick > timeWindowOpen && (
        <PipelineReadyWindow className="absolute bottom-5 right-4 z-10 animate-terminal-popup" />
      )}
      <pre className="font-mono text-sm min-h-[240px] whitespace-pre-wrap break-all">
        <code className="grid">{lines}</code>
      </pre>
    </div>
  );
}

export function AgnosticBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIsVisible(ref);

  return (
    <div
      ref={ref}
      className="absolute inset-0 -z-1 mask-[linear-gradient(to_top,white_30%,transparent_calc(100%-120px))]"
    >
      <Dithering
        colorBack="#00000000"
        colorFront="#c6bb58"
        shape="simplex"
        type="4x4"
        speed={visible ? 0.30 : 0}
        className="size-full"
        minPixelRatio={1}
      />
    </div>
  );
}

let observer: IntersectionObserver;
const observerTargets = new WeakMap<Element, (entry: IntersectionObserverEntry) => void>();

function useIsVisible(ref: RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    observer ??= new IntersectionObserver((entries) => {
      for (const entry of entries) {
        observerTargets.get(entry.target)?.(entry);
      }
    });

    const element = ref.current;
    if (!element) return;
    observerTargets.set(element, (entry) => setVisible(entry.isIntersecting));
    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observerTargets.delete(element);
    };
  }, [ref]);

  return visible;
}

function PipelineReadyWindow(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn('overflow-hidden rounded-md border bg-fd-popover shadow-lg', props.className)}
    >
      <p className="text-xs text-fd-muted-foreground text-center px-4 py-2 border-b">
        Acme Corp — Senior Engineer
      </p>
      <p className="text-sm px-4 py-2">Score: 4.4 / 5.0</p>
    </div>
  );
}
