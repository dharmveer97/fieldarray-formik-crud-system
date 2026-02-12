'use client';

import { useState, useCallback, useTransition } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CrudTable } from '@/components/forms/CrudTable';
import { useCrud } from '@/lib/hooks/useCrud';
import { userConfig } from '@/lib/config/user.config';
import { productConfig } from '@/lib/config/product.config';
import { UserSchema } from '@/lib/schemas/user.schema';
import { ProductSchema } from '@/lib/schemas/product.schema';

interface ApiUser {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface ApiProduct {
  id: number;
  title: string;
}

export default function CrudPage() {
  const [activeTab, setActiveTab] = useState('users');
  const [isPending, startTransition] = useTransition();

  const {
    items: users,
    loading: usersLoading,
    error: usersError,
    createItem: createUser,
    updateItem: updateUser,
    deleteItem: deleteUser
  } = useCrud<UserSchema>(
    userConfig.apiEndpoint,
    (data: unknown[]) => (data as ApiUser[]).slice(0, 5).map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      phone: u.phone
    }))
  );

  const {
    items: products,
    loading: productsLoading,
    error: productsError,
    createItem: createProduct,
    updateItem: updateProduct,
    deleteItem: deleteProduct
  } = useCrud<ProductSchema>(
    productConfig.apiEndpoint,
    (data: unknown[]) => (data as ApiProduct[]).slice(0, 5).map((p, i) => ({
      id: p.id,
      name: p.title.slice(0, 20),
      price: (i + 1) * 10,
      stock: (i + 1) * 5
    }))
  );

  const handleSaveUsers = useCallback(async (items: UserSchema[], dirtyIndexes: number[]) => {
    for (const idx of dirtyIndexes) {
      const user = items[idx];
      if (user.id === 0) {
        await createUser(user);
      } else {
        await updateUser(user.id, user);
      }
    }
  }, [createUser, updateUser]);

  const handleSaveProducts = useCallback(async (items: ProductSchema[], dirtyIndexes: number[]) => {
    for (const idx of dirtyIndexes) {
      const product = items[idx];
      if (product.id === 0) {
        await createProduct(product);
      } else {
        await updateProduct(product.id, product);
      }
    }
  }, [createProduct, updateProduct]);

  const handleDeleteUser = useCallback(async (id: number) => {
    await deleteUser(id);
  }, [deleteUser]);

  const handleDeleteProduct = useCallback(async (id: number) => {
    await deleteProduct(id);
  }, [deleteProduct]);

  const switchTab = useCallback((tab: string) => {
    startTransition(() => {
      setActiveTab(tab);
    });
  }, []);

  if (usersLoading || productsLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (usersError || productsError) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error: {usersError || productsError}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">CRUD Management</h1>

      <Tabs className="w-full">
        <TabsList>
          <TabsTrigger active={activeTab === 'users'} onClick={() => switchTab('users')}>
            {userConfig.name}
          </TabsTrigger>
          <TabsTrigger active={activeTab === 'products'} onClick={() => switchTab('products')}>
            {productConfig.name}
          </TabsTrigger>
        </TabsList>

        {isPending && <div className="text-sm text-muted-foreground mt-2">Loading...</div>}

        {activeTab === 'users' && (
          <TabsContent>
            <CrudTable
              config={userConfig}
              items={users}
              onSave={handleSaveUsers}
              onDelete={handleDeleteUser}
            />
          </TabsContent>
        )}

        {activeTab === 'products' && (
          <TabsContent>
            <CrudTable
              config={productConfig}
              items={products}
              onSave={handleSaveProducts}
              onDelete={handleDeleteProduct}
            />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
