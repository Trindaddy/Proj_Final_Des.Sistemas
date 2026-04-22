import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Camera, Mail, User as UserIcon, LogOut, CheckCircle2 } from 'lucide-react';

export const Profile = () => {
  const { user, updateProfile, logout } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Chamada real para a API (que deve estar configurada no useAuth)
      await updateProfile({ name, email });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Erro ao atualizar o perfil", error);
      // Aqui você pode colocar um setError() se quiser avisar o usuário
    } finally {
      setIsSaving(false);
    }
  };

  const handlePhotoChange = () => {
    // Simulate photo upload prompt
    const newParam = prompt('Insira a URL de uma imagem para o seu avatar (Mock):', user?.avatar || '');
    if (newParam !== null) {
      updateProfile({ avatar: newParam });
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Seu Perfil</h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">Gerencie suas informações pessoais e credenciais</p>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-2xl transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Sair da conta</span>
          <span className="sm:hidden">Sair</span>
        </button>
      </div>

      <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-gray-50 to-emerald-50/50 opacity-50 pointer-events-none" />

        <div className="flex flex-col md:flex-row gap-12 relative z-10">

          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-5">
            <div
              className="relative group cursor-pointer"
              onClick={handlePhotoChange}
              title="Mudar foto de perfil"
            >
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-[6px] border-white shadow-xl group-hover:border-gray-50 transition-all duration-300 relative z-10">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-5xl font-bold text-gray-300 group-hover:text-gray-400 transition-colors">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="absolute bottom-1 right-1 p-3 bg-foreground text-background rounded-full shadow-lg transform group-hover:scale-110 transition-transform z-20">
                <Camera className="w-5 h-5" />
              </div>
            </div>

            <div className="text-center">
              <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100/50">
                Membro desde {user.memberSince || 'esse mês'}
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="flex-1 mt-2">
            {showSuccess && (
              <div className="mb-8 p-4 bg-emerald-50/80 text-emerald-800 text-sm rounded-2xl border border-emerald-100/80 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="font-medium">Perfil atualizado com sucesso!</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-6">
              <div className="space-y-2.5">
                <label className="text-sm font-semibold text-foreground ml-1">Nome de exibição</label>
                <div className="relative group">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 outline-none rounded-2xl text-sm transition-all focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    placeholder="Como você prefere ser chamado"
                  />
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="text-sm font-semibold text-foreground ml-1">Endereço de e-mail</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 outline-none rounded-2xl text-sm transition-all focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="pt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving || (name === user.name && email === user.email)}
                  className="bg-foreground text-background px-8 py-4 rounded-2xl font-semibold text-sm transition-all hover:bg-foreground/90 flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:shadow-lg disabled:hover:shadow-md"
                >
                  {isSaving ? (
                    <div className="w-5 h-5 border-[2.5px] border-background border-t-transparent rounded-full animate-spin" />
                  ) : null}
                  {isSaving ? 'Salvando...' : 'Salvar alterações'}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};
