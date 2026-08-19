import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

export type ModalKind = 'register' | 'docs' | 'contact' | null;

type UIContextValue = {
  modal: ModalKind;
  modalPlan: string | null;
  openModal: (kind: Exclude<ModalKind, null>, plan?: string) => void;
  closeModal: () => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
};

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: {children: React.ReactNode;}) {
  const [modal, setModal] = useState<ModalKind>(null);
  const [modalPlan, setModalPlan] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const openModal = useCallback((kind: Exclude<ModalKind, null>, plan?: string) => {
    setModalPlan(plan ?? null);
    setModal(kind);
    setSearchOpen(false);
  }, []);

  const closeModal = useCallback(() => {
    setModal(null);
    setModalPlan(null);
  }, []);

  const value = useMemo(
    () => ({ modal, modalPlan, openModal, closeModal, searchOpen, setSearchOpen }),
    [modal, modalPlan, openModal, closeModal, searchOpen]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI(): UIContextValue {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used inside UIProvider');
  return ctx;
}