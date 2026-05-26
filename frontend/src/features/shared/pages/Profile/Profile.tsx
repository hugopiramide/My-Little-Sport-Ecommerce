import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getCurrentUser, getCurrentUserId, getAuthHeaders } from '../../../auth/utils/authUtils'

import type { ShippingAddressDTO, UserDTO } from '../../types'
import './Profile.css'

interface ShippingAddress extends ShippingAddressDTO {
    id: number
}

const emptyAddress = (): Omit<ShippingAddress, 'id'> => ({
    addressName: '',
    recipientName: '',
    companyName: '',
    street: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    countryCode: '',
    phoneNumber: '',
    deliveryInstructions: '',
})




const Profile: React.FC = () => {
    const navigate    = useNavigate()
    const currentUser = getCurrentUser() as UserDTO | null
    const userId      = getCurrentUserId()

    const [editMode, setEditMode] = useState(false)
    const [personalData, setPersonalData] = useState({
        name:          currentUser?.name          ?? '',
        surname:       currentUser?.surname        ?? '',
        username:      currentUser?.username       ?? '',
        email:         currentUser?.email          ?? '',
        birthday:      currentUser?.birthday       ?? '',
        profileImgUrl: currentUser?.profileImgUrl  ?? '',
    })
    const [personalSaving, setPersonalSaving] = useState(false)
    const [personalMsg,    setPersonalMsg]    = useState<{ type: 'success' | 'error'; text: string } | null>(null)

    const [addresses,       setAddresses]       = useState<ShippingAddress[]>([])
    const [addressLoading,  setAddressLoading]  = useState(true)
    const [activeAddressIdx, setActiveAddressIdx] = useState(0)
    const [editingAddress,  setEditingAddress]  = useState<Omit<ShippingAddress, 'id'> & { id?: number }>(emptyAddress())
    const [isNewAddress,    setIsNewAddress]    = useState(false)
    const [addressMsg,      setAddressMsg]      = useState<{ type: 'success' | 'error'; text: string } | null>(null)
    const [addressSaving,   setAddressSaving]   = useState(false)
    const [editAddressMode, setEditAddressMode] = useState(false)


    useEffect(() => {
        if (!userId) navigate('/login')
    }, [userId, navigate])

    useEffect(() => {
        if (!userId) return
        fetch(`http://localhost:8080/api/shipping-addresses/user/${userId}`, {
            headers: getAuthHeaders(),
        })
            .then(r => (r.ok ? r.json() : []))
            .then((data: ShippingAddress[]) => {
                setAddresses(data)
                if (data.length) {
                    setEditingAddress(data[0])
                } else {
                    setEditingAddress(emptyAddress())
                }
            })
            .catch(() => {})
            .finally(() => setAddressLoading(false))
    }, [userId])



    const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setPersonalData(p => ({ ...p, [name]: value }))
    }

    const handlePersonalSave = async (e: React.FormEvent) => {
        e.preventDefault()
        setPersonalSaving(true)
        setPersonalMsg(null)
        try {
            const res = await fetch(`http://localhost:8080/api/users/${userId}`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify(personalData),
            })
            if (!res.ok) throw new Error()
            
            const updatedUser = await res.json()
            const { 
                emailVerified, requiresVerification, verificationExpiresInSeconds, 
                ...userWithoutSensitiveData 
            } = updatedUser;
            
            sessionStorage.setItem('user', JSON.stringify(userWithoutSensitiveData))
            setPersonalMsg({ type: 'success', text: 'Profile updated successfully.' })
            setEditMode(false)
            
            window.location.reload()
        } catch {
            setPersonalMsg({ type: 'error', text: 'Could not save changes. Please try again.' })
        } finally {
            setPersonalSaving(false)
        }
    }

    const selectAddress = (idx: number) => {
        setActiveAddressIdx(idx)
        setEditingAddress(addresses[idx] || emptyAddress())
        setIsNewAddress(false)
        setEditAddressMode(false)
        setAddressMsg(null)
    }

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setEditingAddress(p => ({ ...p, [name]: value }))
    }

    const handleAddressSave = async (e: React.FormEvent) => {
        e.preventDefault()
        setAddressSaving(true)
        setAddressMsg(null)
        try {
            const isUpdate = !isNewAddress && editingAddress.id != null
            const url    = isUpdate
                ? `http://localhost:8080/api/shipping-addresses/${editingAddress.id}`
                : `http://localhost:8080/api/shipping-addresses`
            const method = isUpdate ? 'PUT' : 'POST'
            const body   = isUpdate
                ? editingAddress
                : { ...editingAddress, userId }

            const res = await fetch(url, {
                method,
                headers: getAuthHeaders(),
                body: JSON.stringify(body),
            })
            if (!res.ok) throw new Error()
            const saved: ShippingAddress = await res.json()
            if (isUpdate) {
                setAddresses(prev => prev.map(a => (a.id === saved.id ? saved : a)))
            } else {
                setAddresses(prev => {
                    const next = [...prev, saved]
                    setActiveAddressIdx(next.length - 1)
                    return next
                })
                setIsNewAddress(false)
                setEditingAddress(saved)
            }
            setEditAddressMode(false)
            setAddressMsg({ type: 'success', text: 'Address saved successfully.' })
        } catch {
            setAddressMsg({ type: 'error', text: 'Could not save address.' })
        } finally {
            setAddressSaving(false)
        }
    }

    const handleAddressDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this address?')) return
        setAddressSaving(true)
        setAddressMsg(null)
        try {
            const url = `http://localhost:8080/api/shipping-addresses/${activeAddressIdx}?userId=${userId}`
            const res = await fetch(url, {
                method: 'DELETE',
                headers: getAuthHeaders(),
            })
            if (!res.ok) throw new Error()
            
            setAddresses(prev => {
                const next = prev.filter((_, idx) => idx !== activeAddressIdx)
                let newIdx = activeAddressIdx
                if (newIdx >= next.length) {
                    newIdx = Math.max(0, next.length - 1)
                }
                setActiveAddressIdx(newIdx)
                if (next.length > 0) {
                    setEditingAddress(next[newIdx])
                } else {
                    setEditingAddress(emptyAddress())
                }
                return next
            })
            setAddressMsg({ type: 'success', text: 'Address deleted successfully.' })
        } catch {
            setAddressMsg({ type: 'error', text: 'Could not delete address.' })
        } finally {
            setAddressSaving(false)
        }
    }

    const startNewAddress = () => {
        setEditingAddress(emptyAddress())
        setIsNewAddress(true)
        setEditAddressMode(true)
        setAddressMsg(null)
    }

    if (!currentUser) return null

    const avatarLetter = (currentUser.name || currentUser.username || '?')[0].toUpperCase()

    return (
        <div className="profile-page bg-white min-vh-100">
            <div className="container py-5 mt-2">
                <div className="profile-page__header mb-5 pb-4 border-bottom">
                    <h1 className="fw-black text-uppercase tracking-tighter mb-0">PERSONA DATA</h1>
                </div>
                <section className="profile-section mb-5 border-bottom pb-5" aria-labelledby="personal-heading">
                    {personalMsg && (
                        <div className={`profile-msg ${personalMsg.type === 'success' ? 'profile-msg--success' : 'profile-msg--error'} mb-3`}>
                            {personalMsg.text}
                        </div>
                    )}

                    <form onSubmit={handlePersonalSave}>
                        <div className="row g-5 align-items-start">
                            <div className="col-lg-8">
                                <div className="row g-4">
                                    {[
                                        { label: 'Name',            name: 'name',          type: 'text'  },
                                        { label: 'Username',        name: 'username',      type: 'text', },
                                        { label: 'Birth Date',      name: 'birthday',      type: 'date'  },
                                        { label: 'Surname',         name: 'surname',       type: 'text'  },
                                        { label: 'Email',           name: 'email',         type: 'email' },
                                        { label: 'Profile Image URL', name: 'profileImgUrl', type: 'url' },
                                    ].map(f => (
                                        <div key={f.name} className="col-12 col-sm-6 col-md-4">
                                            <label htmlFor={`profile-${f.name}`} className="profile-label">{f.label}</label>
                                            <input
                                                id={`profile-${f.name}`}
                                                type={f.type}
                                                name={f.name}
                                                value={(personalData as any)[f.name]}
                                                onChange={handlePersonalChange}
                                                disabled={!editMode || ['username', 'birthday', 'email'].includes(f.name)}
                                                className="profile-input w-100"
                                                placeholder={f.label}
                                                required={['name', 'surname', 'email'].includes(f.name)}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-5 d-flex flex-column flex-sm-row justify-content-center justify-content-lg-start gap-3">
                                    {!editMode ? (
                                        <button
                                            type="button"
                                            className="btn-dark-custom w-100 w-sm-auto"
                                            onClick={(e) => { e.preventDefault(); setEditMode(true); setPersonalMsg(null) }}
                                        >
                                            Edit
                                        </button>
                                    ) : (
                                        <div className="d-flex flex-column flex-sm-row gap-3 w-100 w-sm-auto">
                                            <button type="submit" disabled={personalSaving} className="btn-dark-custom w-100 w-sm-auto">
                                                {personalSaving ? 'Saving…' : 'Save'}
                                            </button>
                                            <button
                                                type="button"
                                                className="btn-custom w-100 w-sm-auto"
                                                onClick={(e) => { e.preventDefault(); setEditMode(false); setPersonalMsg(null) }}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-4 d-flex justify-content-center justify-content-lg-end">
                                <div className="profile-avatar">
                                    {personalData.profileImgUrl ? (
                                        <img
                                            src={personalData.profileImgUrl}
                                            alt="Profile avatar"
                                            className="profile-avatar__img"
                                            onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                                        />
                                    ) : (
                                        <svg className="profile-avatar__placeholder-icon" viewBox="0 0 24 24">
                                            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                                        </svg>
                                    )}
                                </div>
                            </div>
                        </div>
                    </form>
                </section>

                <section className="profile-section mb-5 border-bottom pb-5" aria-labelledby="shipping-heading">
                    <h2 id="shipping-heading" className="profile-section__title mb-4">Shipping</h2>

                    {addressLoading ? (
                        <div className="d-flex justify-content-center py-4">
                            <div className="spinner-border spinner-border-sm text-dark" role="status" />
                        </div>
                    ) : (
                        <>
                            <div className="profile-addr-tabs">
                                {addresses.map((addr, idx) => (
                                    <button
                                        key={addr.id ?? idx}
                                        type="button"
                                        onClick={() => selectAddress(idx)}
                                        className={`profile-addr-tab ${activeAddressIdx === idx && !isNewAddress ? 'profile-addr-tab--active' : ''}`}
                                    >
                                        {idx === 0 ? (addr.addressName || 'Personal Address [Main]') : (addr.addressName || `Personal Address ${idx + 1}`)}
                                    </button>
                                ))}
                                {(isNewAddress || addresses.length === 0) && (
                                    <button className="profile-addr-tab profile-addr-tab--active">
                                        {editingAddress?.addressName || 'New Address'}
                                    </button>
                                )}
                            </div>

                            {addressMsg && (
                                <div className={`profile-msg ${addressMsg.type === 'success' ? 'profile-msg--success' : 'profile-msg--error'} mb-3`}>
                                    {addressMsg.text}
                                </div>
                            )}

                            <form onSubmit={handleAddressSave} className="profile-addr-form pt-2">
                                <div className="row g-4">
                                    {[
                                        { label: 'Address Name (e.g. Home, Work)', name: 'addressName', col: 'col-12 col-sm-6 col-md-4' },
                                        { label: 'Recipient Name',        name: 'recipientName',        col: 'col-12 col-sm-6 col-md-4' },
                                        { label: 'Company Name',          name: 'companyName',          col: 'col-12 col-sm-6 col-md-4' },
                                        { label: 'Street',                name: 'street',               col: 'col-12 col-sm-6 col-md-4' },
                                        { label: 'Address Line 2',        name: 'addressLine2',         col: 'col-12 col-sm-6 col-md-4' },
                                        { label: 'City',                  name: 'city',                 col: 'col-12 col-sm-6 col-md-4' },
                                        { label: 'Postal Code',           name: 'postalCode',           col: 'col-12 col-sm-6 col-md-4' },
                                        { label: 'Phone Number',          name: 'phoneNumber',          col: 'col-12 col-sm-6 col-md-4' },
                                        { label: 'Delivery Instructions', name: 'deliveryInstructions', col: 'col-12 col-sm-6 col-md-4' },
                                        { label: 'Country Code',          name: 'countryCode',          col: 'col-12 col-sm-6 col-md-4' },
                                    ].map(f => (
                                        <div key={f.name} className={f.col}>
                                            <label htmlFor={`addr-${f.name}`} className="profile-label">{f.label}</label>
                                            <input
                                                id={`addr-${f.name}`}
                                                type="text"
                                                name={f.name}
                                                value={(editingAddress as any)?.[f.name] ?? ''}
                                                onChange={handleAddressChange}
                                                disabled={!editAddressMode}
                                                className="profile-input w-100"
                                                placeholder={f.label}
                                                required={['addressName', 'recipientName', 'street', 'city', 'postalCode', 'countryCode'].includes(f.name)}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-5 d-flex flex-column flex-md-row justify-content-center justify-content-md-start align-items-stretch gap-3">
                                    <div className="d-flex flex-column flex-sm-row gap-3 w-100 w-md-auto">
                                        {!editAddressMode ? (
                                            <>
                                                <button
                                                    type="button"
                                                    className="btn-dark-custom w-100 w-sm-auto"
                                                    onClick={(e) => { e.preventDefault(); setEditAddressMode(true); setAddressMsg(null) }}
                                                >
                                                    Edit
                                                </button>
                                                {addresses.length > 0 && !isNewAddress && (
                                                    <button
                                                        type="button"
                                                        className="btn-custom bg-danger text-white border-0 w-100 w-sm-auto"
                                                        onClick={(e) => { e.preventDefault(); handleAddressDelete() }}
                                                        disabled={addressSaving}
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <button type="submit" disabled={addressSaving} className="btn-dark-custom w-100 w-sm-auto">
                                                    {addressSaving ? 'Saving…' : 'Save'}
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn-custom w-100 w-sm-auto"
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        setEditAddressMode(false)
                                                        setAddressMsg(null)
                                                        if (isNewAddress) {
                                                            setIsNewAddress(false)
                                                            if (addresses.length > 0) {
                                                                selectAddress(activeAddressIdx)
                                                            } else {
                                                                setEditingAddress(emptyAddress())
                                                            }
                                                        } else {
                                                            setEditingAddress(addresses[activeAddressIdx] || emptyAddress())
                                                        }
                                                    }}
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        )}
                                    </div>

                                    {!isNewAddress && (
                                        <button
                                            type="button"
                                            className="btn-custom bg-white px-5 w-100 w-md-auto"
                                            onClick={startNewAddress}
                                            id="add-address-btn"
                                        >
                                            Add Address
                                        </button>
                                    )}
                                </div>
                            </form>
                        </>
                    )}
                </section>

                <section className="profile-section text-center py-5 mt-5" aria-labelledby="orders-heading">
                    <h2 id="orders-heading" className="mb-4">Your Orders</h2>
                    <p className="text-muted mb-4">View and manage your past orders and returns.</p>
                    <Link to="/order-history" className="btn-dark-custom px-5 py-3 d-inline-block fs-6 text-uppercase" style={{ letterSpacing: '1px' }}>
                        View Order History
                    </Link>
                </section>

            </div>
        </div>
    )
}

export default Profile
