'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { DropdownMenuRadioGroup } from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react';
import calendarIcon from '../_assets/calendar-icon.svg';
import logo from '../_assets/logo.svg';
import FlagIcon from './icons/flag-icon';
import MapIcon from './icons/map-icon';

export default function Header({
  year,
  expensesType,
}: {
  year: number;
  expensesType: 'uf' | 'party';
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <header className="mb-12 flex flex-col gap-10 lg:flex-row  lg:justify-between justify-center items-center">
      <div className="flex items-center gap-4">
        <Image src={logo} alt="Logo" width={70} height={70} />
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-1">
            Gastos dos Senadores Brasileiros
          </h1>
          <p>
            Gastos dos senadores brasileiros total por{' '}
            <strong>{expensesType === 'uf' ? 'estado' : 'partido'}</strong> -
            CEAPS
          </p>
        </div>
      </div>
      <nav className="flex gap-6">
        <div className="border-r-2 pr-6 border-black/10">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <button className="flex flex-col items-center justify-center text-xs gap-2 border-black/10 border-2 px-4 py-3 rounded-lg">
                <Image src={calendarIcon} alt="ícone de calendário" />
                Calendário
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Escolha o Ano</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={year.toString()}
                onValueChange={(year) => {
                  router.push(
                    `${pathname}?${createQueryString('year', year.toString())}`
                  );
                }}
              >
                <DropdownMenuRadioItem className="cursor-pointer" value="2024">
                  2024
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem className="cursor-pointer" value="2023">
                  2023
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem className="cursor-pointer" value="2022">
                  2022
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem className="cursor-pointer" value="2021">
                  2021
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem className="cursor-pointer" value="2020">
                  2020
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex gap-4">
          <NavButton
            expenseType="uf"
            onClick={() =>
              router.push(`${pathname}?${createQueryString('type', 'uf')}`)
            }
          >
            <MapIcon />
            Gastos por UF
          </NavButton>
          <NavButton
            expenseType="party"
            onClick={() =>
              router.push(`${pathname}?${createQueryString('type', 'party')}`)
            }
          >
            <FlagIcon />
            Gastos por Partido
          </NavButton>
        </div>
      </nav>
    </header>
  );
}

type NavButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  expenseType: 'uf' | 'party';
};

function NavButton({ expenseType, children, ...props }: NavButtonProps) {
  const searchParams = useSearchParams();
  const selectedExpenseType = searchParams.get('type') || 'uf';
  return (
    <button
      className={cn(
        'flex flex-col items-center justify-center text-xs gap-2 border-black/10 border-2 px-4 py-3 rounded-lg hover:border-violet-500 transition-colors hover:fill-violet-500 fill-slate-500',
        selectedExpenseType === expenseType &&
          'border-violet-500 fill-violet-500'
      )}
      {...props}
    >
      {children}
    </button>
  );
}
