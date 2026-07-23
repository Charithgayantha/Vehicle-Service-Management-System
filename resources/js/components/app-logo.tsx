import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30">
                <AppLogoIcon className="size-5 fill-current" />
            </div>
            <div className="ml-2 grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-bold tracking-tight text-white">
                    AutoTech Hub
                </span>
                <span className="truncate text-[10px] text-zinc-400 font-mono tracking-wider">
                    VSS System
                </span>
            </div>
        </>
    );
}