<script setup lang="ts">

import { useQueryClient } from '@tanstack/vue-query';
import axios from 'axios';
import { useUser } from '@/composables/useUser';
import { useUserDelete } from '@/composables/user/useUserDelete';
import SidebarMenu from '@/components/SidebarMenu.vue';
import Swal from 'sweetalert2';

const { data: users, isLoading, isError, error } = useUser();
const queryClient = useQueryClient();
const { mutateAsync: deleteUser } = useUserDelete();

const handleDelete = async (userId: number, userName: string) => {
    const result = await Swal.fire({
        title: 'Hapus User',
        text: `Kamu yakin untuk hapus ${userName}?`,
        icon: 'warning',
        showCancelButton: true,
    });

    if (!result.isConfirmed) {
        if (result.isDismissed) {
            await Swal.fire('Batal', 'User tidak jadi dihapus', 'info');
        }
        return;
    }

    try {
        await deleteUser(userId);
        await queryClient.invalidateQueries({ queryKey: ['users'] });
        await Swal.fire('Berhasil', `User ${userName} berhasil dihapus`, 'success');
    } catch (err) {
        const message = axios.isAxiosError(err)
            ? (err.response?.data?.message as string | undefined) ?? err.message
            : 'Gagal menghapus user';
        await Swal.fire('Gagal', message, 'error');
    }
}

</script>

<template>
    <div class="container my-5">
        <div class="row">
            <div class="col-md-3">
                <SidebarMenu />
            </div>
            <div class="col-md-9">
                <div class="card border-0 rounded-4 shadow-sm">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <span>USERS</span>
                        <router-link to="/admin/users/create"
                            class="btn btn-primary btn-sm rounded-4 shadow-sm border-0">ADD USER</router-link>
                    </div>
                    <div class="card-body">
                        <div v-if="isLoading" class="alert alert-info text-center">
                            Loading...
                        </div>

                        <div v-if="isError" class="alert alert-danger text-center">
                            Error: {{ error?.message }}
                        </div>

                        <table v-if="users && users.length" class="table table-bordered">
                            <thead class="table-dark text-white">
                                <tr>
                                    <th>Fullname</th>
                                    <th>Email Address</th>
                                    <th style="width: 20%">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="user in users" :key="user.id">
                                    <td>{{ user.name }}</td>
                                    <td>{{ user.email }}</td>
                                    <td>
                                        <router-link :to="`/admin/users/${user.id}/edit`" class=" btn btn-warning btn-sm rounded-4 shadow-sm
                                            border-0">EDIT</router-link>
                                        <button class="btn btn-danger btn-sm rounded-4 shadow-sm border-0"
                                            @click="handleDelete(user.id, user.name)">
                                            DELETE
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div v-if="!isLoading && !isError && users && !users.length"
                            class="alert alert-warning text-center">
                            Data user kosong.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>